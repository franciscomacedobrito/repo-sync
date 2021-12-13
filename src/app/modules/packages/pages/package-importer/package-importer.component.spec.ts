import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PackageImporterComponent} from './package-importer.component';

describe('PackageImporterComponent', () => {
  let component: PackageImporterComponent;
  let fixture: ComponentFixture<PackageImporterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PackageImporterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageImporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
