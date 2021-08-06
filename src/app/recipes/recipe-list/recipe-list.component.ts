import { EventEmitter, OnDestroy, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {


  recipes: Recipe[];
  subscription: Subscription;

  @Output() no_of_recipes = new EventEmitter<number>();
 // @Output() recipeWasSelected = new EventEmitter<Recipe>();

  constructor(private recipeService:RecipeService,
        private router:Router,
        private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription= this.recipeService.recipesChanged.subscribe(
      (newRecipes: Recipe[])=>{
        this.recipes = newRecipes;
      }
    )

    this.recipes = this.recipeService.getRecipes();
    /* For now  */
    this.no_of_recipes.emit(this.recipes.length);
    console.log("Emitting event from ngOnInit for no_of_recipes !");
  }

  sendRecipeLength(){
    this.no_of_recipes.emit(this.recipes.length);
    console.log("sendRecipeLength called!");
  }

/*   onRecipeSelected(recipe : Recipe){
    this.recipeWasSelected.emit(recipe);
  } */

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo: this.route});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
