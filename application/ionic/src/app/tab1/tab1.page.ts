import { Component , Input, ViewChild } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { DrawerComponent } from '../components/drawer/drawer.component';
import { DetailsPage } from '../details/details.page';
import { Storage } from '@ionic/storage';
import { IonInfiniteScroll, IonVirtualScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    
  list:any;
  truelist:any;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;

  selectOptions = [
    "entrée",
    "plat",
    "dessert",
    "fromage",
    "test",
    "autre"
  ];
  filterChips = [];

  loading;

  searchQuery;

  display = true;

  buttonBGColor = false;

  select: Array<String>;

  constructor
    (
      private drawer: DrawerComponent,
      private toastCtrl: ToastController,
      private modalCtrl: ModalController ,
      private loadingCtrl: LoadingController,
      private storageService: Storage
    ) 
    {
      this.init()
    }

    init()
    {
      this.getRecipes().then((result) => {
        this.list = result;
        this.truelist = result;
      });
    }
  
  // loadData(event) 
  // {
  //     // load more data
  //     this.getRecipes().then((result) => {
  //       this.list = result;
  //     });

  //     //Hide Infinite List Loader on Complete
  //     event.target.complete();

  //     //Rerender Virtual Scroll List After Adding New Data
  //     this.virtualScroll.checkEnd();

  //     // App logic to determine if all data is loaded
  //     // and disable the infinite scroll
  //     if (this.list.length == 16000) 
  //     {
  //       event.target.disabled = true;
  //     }
  // }

  // toggleInfiniteScroll() 
  // {
  //   this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  // }
    
  async search(evt)
  {
    this.searchQuery = evt.target.value;
    const result = 
    await this.list
      .filter( _recipe_ => _recipe_.title.toLowerCase().includes(this.searchQuery.toLowerCase()) );
    this.list = result;
    return this.list;
  }

  async clearSearch()
  {
    this.list = this.truelist
    return this.list;
  }

  async displayLoading()
  {
    const loading =  await this.loadingCtrl.create({
      message: 'Patientez pendant quelques instants ...',
      duration: 2000
    })
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  getRecipes()
  {
    return this.storageService.get("RECIPES");
  }


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

  async openModal(id)
  {
    const modal =  await this.modalCtrl.create({
      component: DetailsPage,
      componentProps: { id: id }
    })
    await modal.present();
  }
}
