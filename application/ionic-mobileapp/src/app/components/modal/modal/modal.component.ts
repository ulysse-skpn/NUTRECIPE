import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() type: string
  @Input() title:string
  @Input() prep:string
  @Input() cook:string
  @Input() rest:string
  @Input() categories:string
  @Input() ingredients_list:any
  @Input() instructions:any
  @Input() serving_size:string
  @Input() image:string
  
  constructor(
    private modalController:ModalController
  ) { }

  ngOnInit(): void
  {
    this.ingredients_list = this.removeSpecialChars(this.ingredients_list)
    this.instructions = this.removeSpecialChars(this.instructions)
  }

  removeSpecialChars(string:string)
  {
    return string.replace(/[\[\]"']+/g,'').split(",") //?
  }

  close()
  {
    this.modalController.dismiss()
  }

}
