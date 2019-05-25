import { Component, OnInit } from '@angular/core';
import { FriendService } from '../friend.service';
import { Friend } from './friend';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  constructor(private friendService: FriendService) { }
  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.friendService.form.controls;
  friendArray = [];
  searchText: string = "";

  ngOnInit() {
    this.friendService.getFriend().subscribe(
      list => {
        this.friendArray = list.map(item => {
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
    if (this.friendService.form.valid) {
      if (this.friendService.form.get('$key').value == null) {
        // insert ke database
        this.friendService.insertFriend(this.friendService.form.value);
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000);
        this.submitted = false;
      }
    }
    /*//} else {
      // update
    }*/
  }
  filterCondition(friend) {
    return friend.nama.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }
}
