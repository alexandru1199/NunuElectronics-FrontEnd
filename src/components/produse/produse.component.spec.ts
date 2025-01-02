import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduseComponent } from './produse.component';

describe('ProduseComponent', () => {
  let component: ProduseComponent;
  let fixture: ComponentFixture<ProduseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProduseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
