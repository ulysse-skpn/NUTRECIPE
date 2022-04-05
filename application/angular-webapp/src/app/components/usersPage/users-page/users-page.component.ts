import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users/users.service';
import { DialogAddUserComponent } from '../../dialog/add-user-form/dialog-add-user/dialog-add-user.component';
import { DialogModifUserComponent } from '../../dialog/modif-user-form/dialog-modif-user/dialog-modif-user.component';
import { IUserOut } from 'src/app/interfaces/IUser';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['../../pages.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class UsersPageComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  
  columnsToDisplay = ['id', 'last_name' , 'first_name' , 'phone_number' , 'modif' , 'suppr' ]
  ELEMENT_DATA:IUserOut[] = []
  dataSource:MatTableDataSource<IUserOut> = new MatTableDataSource() 
  expandedElement!:any | null
  pageSize!:number
  pageIndex:number = 0
  pageSizeOptions: number[] = [10, 30, 50 , 100];
  isLoading:boolean = false
  durationInSeconds = 5

  constructor(
    private userService:UsersService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void 
  {
    this.sizeIngredientsArray()
  }

  add()
  {
    this.openAddDialog()
  }

  edit(event: Event , id:number)
  {
    event.stopPropagation();
    this.openModifDialog(id)
  }

  delete(event:Event , id:number)
  {
    event.stopPropagation();

    const snackBarRef = this.snackBar.open( "Annuler action : 'Supprimer'" , "Undo" , { duration: 3000 } )
    snackBarRef.afterDismissed().subscribe( (e) => {
      if( e.dismissedByAction === true )
      {
        this.snackBar.open( "Annulation" , "" , { duration: 2000 } )
        return
      }

      this.userService.deleteUser(id).subscribe( () => {
        this.snackBar.open( "Elément supprimé" , "" , { duration: 2000 } )
      })
    })
  }

  openAddDialog()
  {
    this.dialog.open(DialogAddUserComponent , {
      minWidth:'300px'
    });
  }

  openModifDialog(id:number)
  {
    this.dialog.open(DialogModifUserComponent , {
      data: { id: id },
      minWidth:'300px'
    });
  }

  applyFilter(event:Event) 
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  sizeIngredientsArray()
  {
    this.userService.getSizeArrayUsers().subscribe( (res) => {
      this.pageSize = res.nbElem

      this.loadIngredients()
    })
  }

  loadIngredients( pageIndex = this.pageIndex , pageSize = this.pageSize )
  {
    this.isLoading = true

    this.userService.getAllUsers(pageIndex,pageSize).subscribe( async(res:IUserOut[]) => {
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
