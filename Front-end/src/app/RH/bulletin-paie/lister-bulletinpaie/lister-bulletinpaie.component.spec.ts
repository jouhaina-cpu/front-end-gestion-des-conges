import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerBulletinComponent } from './lister-bulletinpaie.component';

describe('ListerBulletinComponent', () => {
  let component: ListerBulletinComponent;
  let fixture: ComponentFixture<ListerBulletinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerBulletinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerBulletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
