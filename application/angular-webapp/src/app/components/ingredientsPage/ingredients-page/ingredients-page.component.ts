import { Component, OnInit, ViewChild } from '@angular/core';
import { ITableIngredient } from 'src/app/interfaces/ingredients/ITableIngredients';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';
import { IIngredient } from 'src/app/interfaces/ingredients/IIngredients';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  
  columnsToDisplay = ['id', 'product_name' , 'modif' , 'suppr' ]
  ELEMENT_DATA:IIngredient[] = []
  dataSource:MatTableDataSource<IIngredient> = new MatTableDataSource() 
  expandedElement!: ITableIngredient | null
  pageSize!:number
  pageIndex:number = 0
  pageSizeOptions: number[] = [10, 30, 50 , 100];
  isLoading:boolean = false
  durationInSeconds = 5

  constructor(
    private ingredientService:IngredientsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void 
  {
    this.sizeIngredientsArray()
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

  delete(id:number)
  {
    const snackBarRef = this.snackBar.open( "Annuler action : 'Supprimer'" , "Undo" , { duration: 3000 } )
    snackBarRef.afterDismissed().subscribe( (e) => {
      if( e.dismissedByAction === true )
      {
        this.snackBar.open( "Annulation" , "" , { duration: 2000 } )
        return
      }

      this.ingredientService.deleteIngredient(id).subscribe( () => {
        this.snackBar.open( "Elément supprimé" , "" , { duration: 2000 } )
      })
    })
  }

  applyFilter(event:Event) 
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  sizeIngredientsArray()
  {
    this.ingredientService.getSizeArrayIngredients().subscribe( (res) => {
      this.pageSize = res.nbElem

      this.loadIngredients()
    })
  }

  loadIngredients( pageIndex = this.pageIndex , pageSize = this.pageSize )
  {
    this.isLoading = true

    this.ingredientService.getAllIngredients(pageIndex,pageSize).subscribe( async(res:IIngredient[]) => {
      this.isLoading = false
      this.ELEMENT_DATA = res
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
      this.dataSource.paginator = this.paginator
    })
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) 
  {
    if (setPageSizeOptionsInput) this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str)
  }
}
