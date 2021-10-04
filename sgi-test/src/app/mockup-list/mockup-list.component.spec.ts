import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockupListComponent } from './mockup-list.component';

describe('MockupListComponent', () => {
  let component: MockupListComponent;
  let fixture: ComponentFixture<MockupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MockupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
