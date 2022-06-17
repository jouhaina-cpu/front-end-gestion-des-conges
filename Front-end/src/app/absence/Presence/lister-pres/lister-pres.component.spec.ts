import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerPresComponent } from './lister-pres.component';

describe('ListerPresComponent', () => {
  let component: ListerPresComponent;
  let fixture: ComponentFixture<ListerPresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerPresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerPresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
