import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { ingredient } from "../shared/ingredient.model";

export class ShoppingListService{

 // ingredientsChanged = new EventEmitter<ingredient[]>();
 ingredientsChanged = new Subject<ingredient[]>();
 startedEditing = new Subject<number>();

  private ingredients:ingredient[] = [
    new ingredient('Apple', 5),
    new ingredient('Orange', 10)
  ];

  getIngredient(index: number){
    return this.ingredients[index];
  }

  getIngredients(){
    return this.ingredients.slice(); // getting copy/slice of original array
  }

  addIngredientAdded(newIngredient : ingredient){
    this.ingredients.push(newIngredient);
   // this.ingredientsChanged.emit(this.ingredients.slice()); // emitting new slice of ingredients array after change
   this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients:ingredient[]){
    /* for(let ingredient of ingredients){
      this.addIngredientAdded(ingredient);
    } */ //emits lot of events so avoided

    this.ingredients.push(...ingredients);
   // this.ingredientsChanged.emit(this.ingredients.slice()); // emitting new slice of ingredients array after change
   this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index:number,newIngredient: ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
