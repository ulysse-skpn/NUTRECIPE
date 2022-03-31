import { Component } from '@angular/core';
import { DrawerComponent } from '../components/drawer/drawer.component';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private drawer: DrawerComponent
  ) {}

  openDrawer()
  {
    this.drawer.openDrawer();
  }
}
