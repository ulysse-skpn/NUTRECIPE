import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DrawerComponent } from '../components/drawer/drawer.component';
import { DetailsPage } from '../details/details.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  list = [
    {
      "id":1,
      "name":"Lasagne",
      "cookingTime":"35 min",
      "bookmark":true
    },
    {
      "id":2,
      "name":"Burger",
      "cookingTime":"10 min",
      "bookmark":true
    },
    {
      "id":3,
      "name":"Pizza",
      "cookingTime":"60 min",
      "bookmark":false
    },
  ];
  selectOptions = [
    "entrée",
    "plat",
    "dessert",
    "fromage",
    "test",
    "autre"
  ];
  filterChips = [];
  display = true;
  buttonBGColor = false;
  select: Array<String>;

  constructor(
    private drawer: DrawerComponent,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController 
  ) {}

  openDrawer()
  {
    this.drawer.openDrawer();
  }

  changeDisplay()
  {
    this.display = !this.display;
  }

  addFilter()
  {
    if( this.select.length < 5 )
      this.filterChips = this.select;
    else this.filterChips = this.select.slice(-5);
  }

  removeFilter( chip )
  {
    this.filterChips = this.filterChips.filter( item => item !== chip);
    return this.filterChips;
  }

  bookmark( item )
  {
    console.log(item);
    item.bookmark = !item.bookmark; 
    // addToBookmark();
    // alert('bookmarked !!!');
    let message;
    if( item.bookmark == true )
    {
      message = "Ajouté aux favoris";
    }
    else message = "Retrait des favoris";
    this.showToast( message );
  }

  async showToast( message ){
    await this.toastCtrl.create({
      message: message,
      duration:2000
    }).then(res => res.present());
  }

  async openModal()
  {
    const modal =  await this.modalCtrl.create({
      component: DetailsPage
    })
    await modal.present();
  }

}
