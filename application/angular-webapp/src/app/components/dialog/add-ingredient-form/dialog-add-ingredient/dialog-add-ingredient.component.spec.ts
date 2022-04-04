import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddIngredientComponent } from './dialog-add-ingredient.component';

describe('DialogAddIngredientComponent', () => {
  let component: DialogAddIngredientComponent;
  let fixture: ComponentFixture<DialogAddIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddIngredientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
