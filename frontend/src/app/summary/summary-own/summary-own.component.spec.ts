import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnSummaryComponent } from './summary-own.component';

describe('SummaryOwnComponent', () => {
  let component: OwnSummaryComponent;
  let fixture: ComponentFixture<OwnSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
