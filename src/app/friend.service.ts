import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
    providedIn: 'root'
})

export class FriendService {
    constructor(private firebase: AngularFireDatabase) { }
    friendList: AngularFireList<any>;

    // form = new FormGroup({
    //     $key: new FormControl(null),
    //     nama: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    //     emails: new FormControl('', Validators.email),
    //     contactno: new FormControl('', Validators.required),
    // });
    phoneNumber = "^((\\+62-?)|0)?[0-9]{4}$";
    form = new FormGroup({
        $key: new FormControl(null),
        nama: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        emails: new FormControl('', Validators.email),
        // tslint:disable-next-line: max-line-length
        contactno: new FormControl('', [Validators.required, Validators.pattern(this.phoneNumber), Validators.maxLength(4), Validators.minLength(3)]),
    });

    getFriend() {
        this.friendList = this.firebase.list('friend');
        return this.friendList.snapshotChanges();
    }

    insertFriend(friend) {
        this.friendList.push({
            nama: friend.nama,
            emails: friend.emails,
            contactno: friend.contactno
        });
    }
}
