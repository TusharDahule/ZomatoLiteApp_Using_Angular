import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
//import { Subject } from "rxjs";
import { ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipes.model";

@Injectable()
export class RecipeService{

  recipesChanged = new Subject<Recipe[]>();
 // recipeSelected = new EventEmitter<Recipe>();
 // recipeSelected = new Subject<Recipe>();
  /* private recipes: Recipe[]= [
    new Recipe( 'KFC Chicken','Tasty Fried Chicken', 'https://www.savethestudent.org/uploads/kfc4-1.jpg',
     [
       new ingredient('Chicken',240),
       new ingredient('Corn Flour', 1)
     ]),
    new Recipe( 'Chicken Popcorn','Spicy boneless Chicken', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/popcorn-chicken-1586187101.jpg',
    [
      new ingredient('Chicken',120),
      new ingredient('Corn Flour', 1),
      new ingredient('Spicy Masala',2)
    ])

  ]; */ // contains Recipe objects (with declared structure)

  private recipes: Recipe[]=[];

  constructor(private slService:ShoppingListService){}

  getRecipes(){
    //return this.recipe; this would have returned reference of array
    return this.recipes.slice(); // this return exact copy of array

  }

  getRecipeById(index:number){
    return this.recipes[index];
  }

  /* set Recipes from data-storage.service which get data from firebase */
  setRecipes(allRecipes:Recipe[]){
    this.recipes = allRecipes;
    return this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients:ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addIngredient(newRecipe: Recipe){
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index:number,newRecipe:Recipe){
    this.recipes[index]= newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }


}
