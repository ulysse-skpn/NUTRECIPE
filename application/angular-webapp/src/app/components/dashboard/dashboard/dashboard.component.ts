import { Component, OnInit } from '@angular/core';
import { RootService } from 'src/app/services/root-service/root.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private rootService:RootService
  ) { }

  ngOnInit(): void {
  }

  async logout()
  {
    await this.rootService.logout()
  }

}
