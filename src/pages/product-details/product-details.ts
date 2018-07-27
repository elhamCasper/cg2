import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController, LoadingController } from 'ionic-angular';
import { CartPage } from '../cart/cart';
import { Storage } from '@ionic/storage';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  product:any;
  WooCommerce: any;
  reviews: any []= [];
 

  constructor
  (public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: Storage, 
    public toastCtrl: ToastController, 
    public modalCtrl: ModalController, 
    private WP: WoocommerceProvider, 
    private loadingCtrl: LoadingController
  )
  {

    this.product = this.navParams.get("product");
    console.log(this.product);

    this.WooCommerce = WP.init();

    this.WooCommerce.getAsync("products/" + this.product.id)
    .then((data) => {
      this.reviews = JSON.parse(data.body).product;
      console.log('this.reviews');
      console.log(this.reviews);
    }, (error) => {
      console.log(error);
    });
}
  addToCart(product) {
    this.storage.get('cart').then((data) => {
      let cart = data || [];
      let itemExist = false;

      for(let i = 0; i < cart.length; i++) {
        if(product.id === cart[i].product.id) {
          cart[i].qty++;
          cart[i].amount += +cart[i].product.price;

          itemExist = true;
        }
      }

      if(!itemExist) {
        cart.push({
          product:  product,
          qty:      1,
          amount:   +product.price
        });
      }

      this.storage.set('cart', cart);
      this.toastCtrl.create({
        message: 'Product added to cart!',
        duration: 1000
      }).present();
    });
  }

  
  // openCartPage() {
  //   let cartModal = this.modalCtrl.create(CartPage, { });
  //   cartModal.present();
  // }

  openCartPage(){
    this.modalCtrl.create(CartPage).present();
  }

}