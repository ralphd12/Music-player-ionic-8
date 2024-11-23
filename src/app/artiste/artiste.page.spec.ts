import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistePage } from './artiste.page';

describe('ArtistePage', () => {
  let component: ArtistePage;
  let fixture: ComponentFixture<ArtistePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
