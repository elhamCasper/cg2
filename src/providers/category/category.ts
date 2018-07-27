import { Injectable } from '@angular/core';

@Injectable()
export class CategoryProvider {
    categories = [
        { name: 'Beverages', image: 'assets/images/category/beverages2.png' },
        { name: 'Food', image: 'assets/images/category/food3.png' }, 
        { name: 'Household', image: 'assets/images/category/household.png' },
        { name: 'Kitchen Essentials', image: 'assets/images/category/kitchen.png' },
        { name: 'Medicine', image: 'assets/images/category/meds.png' },
        { name: 'Personal Hygiene', image: 'assets/images/category/ph.png' },
        { name: 'Stationery', image: 'assets/images/category/stationery.png' }

    ];

    getCategories() {
        return this.categories;
    }

}

