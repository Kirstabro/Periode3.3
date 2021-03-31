import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentdataComponent } from './currentdata.component';

describe('CurrentdataComponent', () => {
  let component: CurrentdataComponent;
  let fixture: ComponentFixture<CurrentdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
