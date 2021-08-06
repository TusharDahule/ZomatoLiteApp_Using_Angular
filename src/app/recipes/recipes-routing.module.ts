import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesResolverService } from "./recipe-resolver.service";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";

const routes: Routes = [
  {path:'',component:RecipesComponent,/* path empty as we are adding it as lazy loading app-routing.module.ts */
  canActivate:[AuthGuard],
  children:[
    {path:'',component:RecipeStartComponent},
    {path:'new',component:RecipeEditComponent}, //put new before :id
    {path:':id',component:RecipeDetailsComponent, resolve:[RecipesResolverService]},
    {path:':id/edit',component:RecipeEditComponent, resolve:[RecipesResolverService]}
  ]},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],/* forRoot is used one time in app.module  */
  exports: [RouterModule]
})
export class RecipesRoutingModule{}/* imported in RecipesModule */
