import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModifUserComponent } from './dialog-modif-user.component';

describe('DialogModifUserComponent', () => {
  let component: DialogModifUserComponent;
  let fixture: ComponentFixture<DialogModifUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModifUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModifUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
