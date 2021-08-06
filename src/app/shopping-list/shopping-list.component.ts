import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients:ingredient[];
  private igChangeSub: Subscription;


  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangeSub = this.shoppingListService.ingredientsChanged
    .subscribe( //subscribing to event emitted from service
      (ingredients: ingredient[])=>{
        this.ingredients = ingredients;
      }
    );

  }

  ngOnDestroy():void{
    this.igChangeSub.unsubscribe();
  }

  onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index);/* Using Subject to emit index of ingredient */
  }

  /* onIngredientAdded(newIngredient : ingredient){
    this.ingredients.push(newIngredient);
  } */

}
