import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModifRecipeComponent } from './dialog-modif-recipe.component';

describe('DialogModifRecipeComponent', () => {
  let component: DialogModifRecipeComponent;
  let fixture: ComponentFixture<DialogModifRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModifRecipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModifRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
