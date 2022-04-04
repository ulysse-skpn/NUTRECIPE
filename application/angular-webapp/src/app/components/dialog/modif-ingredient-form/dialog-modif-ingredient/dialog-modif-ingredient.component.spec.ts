import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModifIngredientComponent } from './dialog-modif-ingredient.component';

describe('DialogModifIngredientComponent', () => {
  let component: DialogModifIngredientComponent;
  let fixture: ComponentFixture<DialogModifIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModifIngredientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModifIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
