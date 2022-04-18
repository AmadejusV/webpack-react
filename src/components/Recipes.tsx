import {FC, useState} from 'react';

interface IRecipeArgs{
  sugar: number;
  milk: string;
  water: boolean;
  coffeeSpoons?: number;
  leafs?: number;
}

class Recipe{
  sugar: number;
  milk: string;
  water: boolean;
  coffeeSpoons?: number;
  leafs?: number;

  constructor(data: IRecipeArgs){
    this.sugar = data.sugar;
    this.milk = data.milk;
    this.water = data.water;
    this.coffeeSpoons = data.coffeeSpoons ?? 0;
    this.leafs = data.leafs ?? 0;
  }
}

const coffeeRecipe = new Recipe({
  coffeeSpoons: 1,
  sugar: 0,
  milk: '10%',
  water: true
});

const teaRecipe = new Recipe({
  leafs: 5,
  sugar: 0,
  milk: '0%',
  water: true
});

console.log(coffeeRecipe);
console.log(teaRecipe);

const Recipes: FC = () => {
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);

  return (
    <div>
      <h3>Current recipe:</h3>
      <button onClick={()=>setRecipe(coffeeRecipe)}>Coffee recipe</button>
      <button onClick={()=>setRecipe(teaRecipe)}>Tea recipe</button>

      <ul>
        {recipe && Object.keys(recipe).map(m => (
          <li key={m}>
            {m}: {recipe[m as keyof Recipe]}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Recipes;