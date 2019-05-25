import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from './contact';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contacts: Array<Contact>;

  constructor(private contactService: ContactService) {
    // this.contacts = [];
  }
  submitted: boolean;
  showSuccessMessage: boolean;
  showDeletedMessage: boolean;
  contactArray = [];
  formControls = this.contactService.form.controls;

  form = new FormGroup({
    nama: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
    email: new FormControl('', Validators.email),
    pesan: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
  });

  ngOnInit() {
    this.contactService.getContact().subscribe(
      list => {
        this.contactArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactService.form.valid) {
      if (this.contactService.form.get('$key').value == null) {
        // insert ke database
        this.contactService.insertContact(this.contactService.form.value);
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000);
        this.submitted = false;
        this.form.reset();
      }
    }
    /*//} else {
      // update
    }*/
  }
  onDelete($key) {
    if (confirm('Are you sure to delete this record ?')) {
      this.contactService.deleteContact($key);
      this.showDeletedMessage = true;
      setTimeout(() => this.showDeletedMessage = false, 3000);
    }
  }

  // addContact(nama, email, pesan) {
  //   // tslint:disable-next-line: prefer-const
  //   // if (this.form.valid) {
  //   let contact = new Contact(nama, email, pesan);
  //   this.contacts.push(contact);
  //   this.form.reset();
  //   // }
  // }

  // removeContact(contact) {
  //   const index = this.contacts.indexOf(contact);
  //   this.contacts.splice(index, 1);
  // }

}
