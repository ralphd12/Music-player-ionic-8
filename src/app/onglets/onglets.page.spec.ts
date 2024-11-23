import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OngletsPage } from './onglets.page';

describe('OngletsPage', () => {
  let component: OngletsPage;
  let fixture: ComponentFixture<OngletsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OngletsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
