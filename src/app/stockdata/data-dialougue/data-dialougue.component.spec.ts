import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDialougueComponent } from './data-dialougue.component';

describe('DataDialougueComponent', () => {
  let component: DataDialougueComponent;
  let fixture: ComponentFixture<DataDialougueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataDialougueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDialougueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
