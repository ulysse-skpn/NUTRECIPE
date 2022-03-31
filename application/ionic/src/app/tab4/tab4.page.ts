import { Component, OnInit } from '@angular/core';
import { DrawerComponent } from '../components/drawer/drawer.component';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(
    private drawer: DrawerComponent
  ) { }

  ngOnInit() {
  }

  openDrawer()
  {
    this.drawer.openDrawer();
  }
}
