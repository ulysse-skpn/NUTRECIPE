import { Component, OnInit, ViewChild } from '@angular/core';
import { ITableIngredient } from 'src/app/interfaces/ingredients/ITableIngredients';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';
import { IIngredient } from 'src/app/interfaces/ingredients/IIngredients';

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

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  
  columnsToDisplay = ['id', 'product_name' , 'action']
  dataSource = new MatTableDataSource<IIngredient>() 
  expandedElement!: ITableIngredient | null
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex:number = 0

  constructor(
    private ingredientService:IngredientsService
  ) { }

  ngOnInit(): void 
  {
    this.onChangePage()
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

  onChangePage(event?:PageEvent , pageIndex = 0 , pageSize = 25)
  {
    if( event )
    {
      pageIndex = event.pageIndex
      pageSize = event.pageSize
    }

    this.ingredientService.getAllIngredients(pageIndex,pageSize).subscribe( (res) => {
      this.dataSource.data = res
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) 
  {
    if (setPageSizeOptionsInput) this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str)
  }
}
