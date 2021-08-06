import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
/* Basic Approach wihtout Angular */
/*   @ViewChild('nameInput',{static:false}) nameInputRef : ElementRef;
  @ViewChild('amountInput',{static:false}) amountInputRef : ElementRef; */
  //@Output() ingredientAdded = new EventEmitter<ingredient>();

  @ViewChild('f',{static:false}) slForm : NgForm;

  subscription: Subscription;
  editedItemIndex: number;
  editMode = false;
  editedItem: ingredient;

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index:number)=>{
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  /* Basic Approach without Angular */
 /*  onAddItem(){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new ingredient(ingName, ingAmount);
    //this.ingredientAdded.emit(newIngredient);
    this.shoppingListService.addIngredientAdded(newIngredient);
  } */

  /* Using template driven approach */
  onSubmit(form:NgForm){
    const value = form.value;
    const newIngredient = new ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    } else{
      this.shoppingListService.addIngredientAdded(newIngredient);
    }
    this.editMode = false;
    this.slForm.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    /* this.slForm.reset();
    this.editMode = false; */
    this.onClear();
  }
}
