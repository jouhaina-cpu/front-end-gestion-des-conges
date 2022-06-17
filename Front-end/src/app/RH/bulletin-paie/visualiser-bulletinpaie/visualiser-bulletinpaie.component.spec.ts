import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualiserBulletinComponent } from './visualiser-bulletinpaie.component';

describe('VisualiserBulletinComponent', () => {
  let component: VisualiserBulletinComponent;
  let fixture: ComponentFixture<VisualiserBulletinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualiserBulletinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualiserBulletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
