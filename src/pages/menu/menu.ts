 import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams,  ModalController, Events } from 'ionic-angular';
import {HomePage} from '../home/home';
import * as WC from 'woocommerce-api';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  homePage : any;
  //SignupPage: any;
  pageName : any;
  loggedIn: boolean;
  user: any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams,  private WP: WoocommerceProvider, public storage: Storage, public modalCtrl: ModalController, private events: Events) {
    this.homePage = HomePage;
    this.user = {};
   
  }

  ionViewDidEnter() {

    this.storage.ready().then(() => {
      this.storage.get("userLoginInfo").then((userLoginInfo) => {

        if (userLoginInfo != null) {

          console.log("User logged in...");
          this.user = userLoginInfo.user;
          console.log(this.user);
          this.loggedIn = true;
        }
        else {
          console.log("No user found.");
          this.user = {};
          this.loggedIn = false;
        }

      })
    })


  }

  openPage(pageName: string) {
    if (pageName == "SignupPage") {
      this.navCtrl.push(SignupPage);
    }
    if (pageName == "LoginPage") {
      this.navCtrl.push(LoginPage);
    }
    if (pageName == 'logout') {
      this.storage.remove("userLoginInfo").then(() => {
        this.user = {};
        this.loggedIn = false;
      })
    }
    if (pageName == 'cartPage') {
      let modal = this.modalCtrl.create(CartPage);
      modal.present();
    }
  }
}