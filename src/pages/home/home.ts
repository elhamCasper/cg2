import { Component, ViewChild, Input, trigger, state, style, transition, animate, keyframes, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import { ProductsByCategoryPage } from '../products-by-category/products-by-category';
import { ProductDetailsPage } from '../../pages/product-details/product-details';
import { CategoryProvider } from '../../providers/category/category';
import { SearchPage } from '../search/search';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CategoryProvider]
})
export class HomePage {

  WooCommerce: any;
  products:any[];
  categories: any[];
  searchQuery: string = "";


  text: string;
  @Input() data: any;
  list:any;

    animateItems = [];
    animateClass: { 'zoom-in': true };

@ViewChild('content') childNavCtrl : NavController;

  constructor(public navCtrl: NavController, private WP: WoocommerceProvider, private categoryProvider: CategoryProvider) {

    this.categories = [];
  
    this.WooCommerce = WP.init();

    this.WooCommerce.getAsync("products/categories").then((data) => {
      console.log(JSON.parse(data.body).product_categories);

      let temp: any[] = JSON.parse(data.body).product_categories;

      for (let i = 0; i < temp.length; i++)
      {
        if (temp[i].parent == 0) {
          temp[i].subCategories = [];

          // if (temp[i].slug == "clothing") {
          //   temp[i].icon = "shirt";
          // }
          // if (temp[i].slug == "music") {
          //   temp[i].icon = "musical-notes";
          // }
          // if (temp[i].slug == "posters") {
          //   temp[i].icon = "images";
          // }
          
          this.categories.push(temp[i]);
        }
      }
    }, (err) => {
      console.log(err)
     })

 }
 ionViewDidLoad() { 
  console.log('ionViewDidLoad HomePage');
}

ngAfterViewInit() {
  let that = this;
var categories = that.categoryProvider.getCategories()

  for (let i = 0; i < categories.length; i++) {
      setTimeout(function() {
          that.animateItems.push(categories[i]);
      }, 0 * i);
  }
}

openCategoryPage(category){
  this.navCtrl.push(ProductsByCategoryPage, {category : category});
}

openProductPage(product){
  this.navCtrl.push(ProductDetailsPage, {"product": product} )
}

onSearch(event){
  if(this.searchQuery.length > 0){
    this.navCtrl.push(SearchPage,{"searchQuery": this.searchQuery});
  }
}

}
