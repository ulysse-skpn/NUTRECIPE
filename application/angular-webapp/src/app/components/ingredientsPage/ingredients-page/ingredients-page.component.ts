import { Component, OnInit, ViewChild } from '@angular/core';
import { ITableIngredient } from 'src/app/interfaces/ingredients/ITableIngredients';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENT_DATA: ITableIngredient[] = [
  {id: 1, product_name: 'Hydrogen'},
  {id: 2, product_name: 'BBB'}
];

@Component({
  selector: 'app-ingredients-page',
  templateUrl: './ingredients-page.component.html',
  styleUrls: ['../../pages.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class IngredientsPageComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  columnsToDisplay = ['id', 'product_name' , 'action'];
  dataSource = new MatTableDataSource<ITableIngredient>(ELEMENT_DATA)
  expandedElement!: ITableIngredient | null;

  constructor() { }

  ngOnInit(): void 
  {
    console.log( this.dataSource );
  }

  ngAfterViewInit() 
  {
    this.dataSource.paginator = this.paginator;
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

  applyFilter(event: Event) 
  {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
