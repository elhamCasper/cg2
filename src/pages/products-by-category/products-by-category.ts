import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api'; 
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import { ProductDetailsPage } from '../product-details/product-details';

@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {

  WooCommerce: any;
  products:any[];
  page: number;
  category: any;
  product:any;

  constructor(
    private WP: WoocommerceProvider, 
    public navCtrl: NavController,
    public navParams: NavParams,
    
  ){
    this.category = this.navParams.get('category');
    
    this.WooCommerce = WP.init(true);

    this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug).then((data) => {
       console.log(JSON.parse(data.body));
      this.products = (JSON.parse(data.body).products);
   
      }, (err) => {
      console.log(err)
      })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategoryPage');
  }



  openProductPage(product){
    this.navCtrl.push(ProductDetailsPage, {product: product} );
  }



}
