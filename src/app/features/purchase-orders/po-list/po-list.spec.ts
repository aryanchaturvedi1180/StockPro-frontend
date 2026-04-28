import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PoListComponent } from './po-list';

describe('PoListComponent', () => {
  let component: PoListComponent;
  let fixture: ComponentFixture<PoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoListComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PoListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
