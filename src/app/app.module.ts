import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { FriendComponent } from './friend/friend.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavlogComponent } from './navlog/navlog.component';
import { FriendService } from './friend.service';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ContactComponent,
    FriendComponent,
    NavlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    // tslint:disable-next-line: deprecation
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'friend', component: FriendComponent },
    ])
  ],
  providers: [FriendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
