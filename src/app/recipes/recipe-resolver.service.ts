import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";
import { Recipe } from "./recipes.model";

@Injectable({providedIn:'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{

  constructor(private dataStorageService: DataStorageService, private recipeService:RecipeService){}

  /* resolver will suscribe for us automatically */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const recipes = this.recipeService.getRecipes();
    if(recipes.length === 0){
      return this.dataStorageService.fetchRecipes();
    }
    else{
      return recipes;
    }
  }
}
