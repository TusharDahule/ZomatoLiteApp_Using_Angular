import { Component,Input, OnInit } from '@angular/core';
import { RecipeService } from '../../recipe.service';
import { Recipe } from '../../recipes.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe : Recipe;
  @Input() index:number;
  //@Output() recipeSelected = new EventEmitter<void>();

  /* constructor(private recipeService:RecipeService) { } */

  ngOnInit(): void {
  }

 /*  selectRecipe(){
   // this.recipeSelected.emit();
    this.recipeService.recipeSelected.emit(this.recipe);
  } */



}
