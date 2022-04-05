import { Component } from '@angular/core';
import { RootService } from 'src/app/services/root-service/root.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(
    private rootService:RootService
  ) { }

  async logout()
  {
    await this.rootService.logout()
  }

}
