import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';


@Injectable()
export class WoocommerceProvider {

  Woocommerce: any;
  WoocommerceV3: any;

  constructor() {
    this.Woocommerce = WC({
      url: "https://chachasgrocers.com",        //"http://chachagrocers.xyz",
      consumerKey: "ck_031b1a3ca7f2bf6874020909b4317e8b905cc010",
      consumerSecret: "cs_196ce8dee564d958d65cb71508ae5ea012736828"
    });

    this.WoocommerceV3 = WC({
      url: "https://chachasgrocers.com",
      consumerKey: "ck_031b1a3ca7f2bf6874020909b4317e8b905cc010",
      consumerSecret: "cs_196ce8dee564d958d65cb71508ae5ea012736828",
      wpAPI: true,
      version: "wc/v3"
    });
  }

  init(v3?: boolean){
    if(v3 == true){
      return this.WoocommerceV3;
      // console.log('ionViewDidLoad ISSA 3');
    } else {
      return this.Woocommerce;
      // console.log('ionViewDidLoad ISSA NOT 3');
    }
  }

}
