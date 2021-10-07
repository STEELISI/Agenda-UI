import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownfieldComponent } from './dropdownfield.component';

describe('DropdownfieldComponent', () => {
  let component: DropdownfieldComponent;
  let fixture: ComponentFixture<DropdownfieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownfieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
