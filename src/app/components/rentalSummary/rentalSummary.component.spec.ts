import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalSummaryComponent } from './rentalSummary.component';

describe('RentalComponent', () => {
  let component: RentalSummaryComponent;
  let fixture: ComponentFixture<RentalSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
