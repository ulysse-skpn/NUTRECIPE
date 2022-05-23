import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync , fakeAsync , tick } from '@angular/core/testing';
import { IonicModule, ToastController } from '@ionic/angular';
import { Tab3Page } from './tab3.page';
import { BookmarksService } from '../services/bookmarks/bookmarks.service';
import { IngredientsService } from '../services/ingredients/ingredients.service';
import { RecipesService } from '../services/recipes/recipes.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { Ng2SearchPipeModule } from 'ng2-search-filter'
import { SideMenuComponent } from '../components/side-menu/side-menu/side-menu.component';
import { of } from 'rxjs';
import { Tab1Page } from '../tab1/tab1.page';
import { Tab2Page } from '../tab2/tab2.page';
import { IIngredientBookmarkIn, IIngredientBookmarkOut, IRecipeBookmarkIn, IRecipeBookmarkOut } from '../interfaces/IBookmark';
import { NotAuthorizedPage } from '../pages/not-authorized/not-authorized/not-authorized.page';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

const mockRecipeBookmark = 
{
  recipe: 
  {
    isBookmarked:true
  },
  recipeId: 0,
  userId: 0,
  saved: false
}

const mockRecipeBookmarkList = 
[
  {
    recipe: 
    {
      isBookmarked:true
    },
    recipeId: 0,
    userId: 0,
    saved: false
  }
]

const mockIngredientBookmark = 
{
  ingredient: 
  {
    isBookmarked:true
  },
  ingredientId: 0,
  userId: 0,
  saved: false
}

const mockIngredientBookmarkList = 
[
  {
    ingredient: 
    {
      isBookmarked:true
    },
    ingredientId: 0,
    userId: 0,
    saved: false
  }
]

function tokenGetter() 
{
  return sessionStorage.getItem("access_token");
}

const event:Event =
{
  bubbles: false,
  cancelBubble: false,
  cancelable: false,
  composed: false,
  currentTarget: undefined,
  defaultPrevented: false,
  eventPhase: 0,
  isTrusted: false,
  returnValue: false,
  srcElement: undefined,
  target: null,
  timeStamp: 0,
  type: '',
  composedPath: function (): EventTarget[] {
    throw new Error('Function not implemented.');
  },
  initEvent: function (type: string, bubbles?: boolean, cancelable?: boolean): void {
    throw new Error('Function not implemented.');
  },
  preventDefault: function (): void {
    throw new Error('Function not implemented.');
  },
  stopImmediatePropagation: function (): void {
    throw new Error('Function not implemented.');
  },
  stopPropagation: function (): void {
    console.log("stop propagation")
  },
  AT_TARGET: 0,
  BUBBLING_PHASE: 0,
  CAPTURING_PHASE: 0,
  NONE: 0
}

describe('Tab3Page', () => {
  let component: Tab3Page
  let fixture: ComponentFixture<Tab3Page>
  let recipeService:RecipesService
  let ingredientService:IngredientsService
  let bookmarkService:BookmarksService
  let jwtHelper: JwtHelperService
  let url = 'http://localhost:3000'
  let el:HTMLElement
  let store = {}
  let jwtHelperStub:any
  let toastController: ToastController


  beforeEach(waitForAsync(() => {

    spyOn(sessionStorage, 'setItem').and.callFake((key, value) => {
      return store[key] = <string>value
    })
  
    spyOn(sessionStorage,'getItem').and.callFake( (key) => {
      return store[key] || null
    })

    jwtHelperStub = 
    {
      isTokenExpired: jasmine.createSpy('isTokenExpired').and.returnValue(true)
    }

    TestBed.configureTestingModule({
      declarations: [Tab3Page , SideMenuComponent],
      imports: [IonicModule.forRoot() , HttpClientTestingModule , Ng2SearchPipeModule , FormsModule , 
        RouterTestingModule.withRoutes(
          [
            {
              path:'tabs/tab1' , component:Tab1Page
            },
            {
              path:'tabs/tab2' , component:Tab2Page
            },
            {
              path:'tabs/tab3' , component:Tab3Page
            },
            {
              path:'notauthorized' , component:NotAuthorizedPage
            }
          ]
      ),
      JwtModule.forRoot({
        config:
        {
          tokenGetter: tokenGetter,
          allowedDomains:
          [
            'https://127.0.0.1:3000',
            'https://localhost:4000',
            'https://fonts.gstatic.com/s/materialicons/v126/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
          ]
        }
      })
    ],
    providers:[ IngredientsService , RecipesService , BookmarksService , JwtHelperService ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab3Page)
    component = fixture.componentInstance
    fixture.detectChanges()

    ingredientService = TestBed.inject(IngredientsService)
    recipeService = TestBed.inject(RecipesService)
    bookmarkService = TestBed.inject(BookmarksService)
    jwtHelper = TestBed.inject(JwtHelperService)
  }));

  it('should create Tab3 Page', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadIngredientBookmarks method', async() => {
    // spyOn<Tab3Page , any>(component,'loadIngredientBookmarks').and.callThrough()
    const bookmarkServiceSpy = spyOn<any>(bookmarkService,'getAllIngredientBookmarks').and.returnValue(of(mockIngredientBookmarkList))
    component.loadIngredientBookmarks()

    bookmarkService.getAllIngredientBookmarks()

    fixture.whenStable().then( () => {
      fixture.detectChanges()
      expect(bookmarkServiceSpy).toHaveBeenCalled()
    })
  });

  it('should call loadRecipeBookmarks method', async() => {
    // spyOn<Tab3Page , any>(component,'loadRecipeBookmarks').and.callThrough()
    const bookmarkServiceSpy = spyOn<any>(bookmarkService,'getAllRecipeBookmarks').and.returnValue(of(mockRecipeBookmarkList))
    component.loadRecipeBookmarks()

    bookmarkService.getAllRecipeBookmarks()

    fixture.whenStable().then( () => {
      fixture.detectChanges()
      expect(bookmarkServiceSpy).toHaveBeenCalled()
    })
  });


  it('should call bookmark method (ingredient)', async() => {
    spyOn<Tab3Page , any>(component,'bookmark').and.callThrough()

    sessionStorage.setItem("userId",null)

    const bookmark: IIngredientBookmarkIn = 
    {
      ingredientId: 1,
      userId: 1,
      saved: false
    } 

    component.bookmark(event, 'ingredient' , bookmark)
    expect(component.bookmark).toHaveBeenCalled()
    
    fixture.whenStable().then( () => {
      fixture.detectChanges()
      const userId = sessionStorage.getItem("userId")
      expect(userId).toEqual(null)
    })
  });


  it('should call bookmark method (recipe)', async() => {
    spyOn<Tab3Page , any>(component,'bookmark').and.callThrough()

    sessionStorage.setItem("userId","2")

    const bookmark: IRecipeBookmarkIn = 
    {
      recipeId: 1,
      userId: 1,
      saved: false
    } 

    component.bookmark(event, 'recipe' , bookmark)
    expect(component.bookmark).toHaveBeenCalled()

    fixture.whenStable().then( () => {
      fixture.detectChanges()
      const userId = parseInt(sessionStorage.getItem("userId"))
      expect(userId).not.toEqual(null)

      let toastSpy = jasmine.createSpyObj('Toast', ['create', 'present', 'onDidDismiss', 'dismiss'])

      const e = 
      {
        role : "recipe"
      }

      toastSpy.onDidDismiss.and.returnValue(Promise.resolve(e))

      let toastControllerSpy = jasmine.createSpyObj('ToastController', ['create'])
      toastControllerSpy.create.and.callFake( () => {
        return toastSpy
      })
      
      toastSpy.onDidDismiss().then( (e: { role: string }) => {//?
        // expect(e).toBeDefined()
        // expect(e).not.toEqual(null)
        // expect(e.role).toEqual('recipe')

        // if( e.role === 'recipe')
        // {
        //   const bookmarkServiceSpy = spyOn(bookmarkService,'updateRecipeBookmark').and.returnValue(of(1))
        //   bookmarkService.updateRecipeBookmark(bookmark , bookmark.recipeId)
        //   expect(bookmarkServiceSpy).toHaveBeenCalled()
        // }
      })
    })
  });

  it('should call expand method', () => {
    spyOn<Tab3Page , any>(component,'expand').and.callThrough()

    const mockExpanded = 
    {
      expanded: false
    }

    component.expand(mockExpanded)
    
    expect(component.expand).toHaveBeenCalled()
  });

  it('should call saveTab method', () => {
    spyOn<Tab3Page , any>(component,'saveTab').and.callThrough()

    const tab = "card"

    component.saveTab(tab)

    expect(component.saveTab).toHaveBeenCalled()
  });
});
