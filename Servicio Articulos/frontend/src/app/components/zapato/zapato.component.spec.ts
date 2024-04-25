import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapatoComponent } from './zapato.component';

describe('ZapatoComponent', () => {
  let component: ZapatoComponent;
  let fixture: ComponentFixture<ZapatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZapatoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZapatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
