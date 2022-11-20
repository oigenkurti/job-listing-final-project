import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostToEditComponent } from './post-to-edit.component';

describe('PostToEditComponent', () => {
  let component: PostToEditComponent;
  let fixture: ComponentFixture<PostToEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostToEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostToEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
