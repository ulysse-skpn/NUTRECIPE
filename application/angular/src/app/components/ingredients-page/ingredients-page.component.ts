import { Component, OnInit, ViewChild } from '@angular/core';
import { IIngredient } from 'src/app/interfaces/iingredient';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ingredients-page',
  templateUrl: './ingredients-page.component.html',
  styleUrls: ['./ingredients-page.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class IngredientsPageComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  INGREDIENTS: IIngredient[] = [];
  columnsToDisplay = ['#ID', 'product_name' , "action"];
  expandedElement!: IIngredient | null;
  // dataSource = new MatTableDataSource();
  dataSource: IIngredient[] = [];
  pageNumber: number = 0;
  tableFooter: number[] = [];

  constructor(
    private ingredientsService: IngredientsService
  ) { }

  async ngOnInit(): Promise<void> 
  {
    this.ingredientsService.getListLength().subscribe( (res: number) => {
      this.pageNumber = Math.ceil( res / 150 );
      this.generatePagination( this.pageNumber );
    })
    this.ingredientsService.getAllIngredientsPagination( 1 , 100 ).subscribe( (res: IIngredient[]) => {
      this.dataSource = res;      
    });
  }

  generatePagination( pageNumber: number )
  {
    for (let i = 1; i < 11; i++) 
    {
      this.tableFooter.push(i);
    }
  }

  add(event: Event)
  {
    event.stopPropagation();
    alert('add');
  }

  edit(event: Event)
  {
    event.stopPropagation();
    alert('edit');
  }

  delete(event: Event)
  {
    event.stopPropagation();
    alert('delete');
  }
  // getIngredients( page:number , pageSize:number)
  // {
  //   this.ingredientsService.getAllIngredientsPagination( _page , _pageSize ).subscribe( (res: IIngredient[]) => {
  //     this.ingredients = res;
  //   });
  // }

  applyFilter(event: Event) 
  {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}