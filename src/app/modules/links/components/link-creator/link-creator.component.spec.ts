import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LinkCreatorComponent} from './link-creator.component';

describe('LinkCreatorComponent', () => {
  let component: LinkCreatorComponent;
  let fixture: ComponentFixture<LinkCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkCreatorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
