import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveRecipeComponent } from './save-recipe.component';

describe('SaveRecipeComponent', () => {
  let component: SaveRecipeComponent;
  let fixture: ComponentFixture<SaveRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveRecipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
