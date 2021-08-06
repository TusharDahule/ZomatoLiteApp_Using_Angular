//blueprint of how objects must be created or look like

import { ingredient } from "../shared/ingredient.model";

export class Recipe{
    public name:string;
    public description:string;
    public imagePath:string;
    public ingredients: ingredient[]; // ingredient model used

    constructor(name: string, desc:string, imagePath:string, ingredients:ingredient[]){
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}
