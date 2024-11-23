import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LireMusiquePage } from './lire-musique.page';

describe('LireMusiquePage', () => {
  let component: LireMusiquePage;
  let fixture: ComponentFixture<LireMusiquePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LireMusiquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
