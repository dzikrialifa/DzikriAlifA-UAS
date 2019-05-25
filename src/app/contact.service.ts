import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
    providedIn: 'root'
})

export class ContactService {
    constructor(private firebase: AngularFireDatabase) { }
    contactList: AngularFireList<any>;

    form = new FormGroup({
        $key: new FormControl(null),
        nama: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        email: new FormControl('', Validators.email),
        // tslint:disable-next-line: max-line-length
        pesan: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
    });

    getContact() {
        this.contactList = this.firebase.list('contact');
        return this.contactList.snapshotChanges();
    }

    insertContact(friend) {
        this.contactList.push({
            nama: friend.nama,
            email: friend.email,
            pesan: friend.pesan
        });
    }
    deleteContact($key: string) {
        this.contactList.remove($key);
    }
}
