import {useState} from 'react';

const coffeeRecipe = {
  coffeeSpoons: 1,
  sugar: 0,
  milk: '10%',
  water: true
};

const teaRecipe = {
  leafs: 5,
  sugar: 0,
  milk: '0%',
  water: true
};

console.log(coffeeRecipe);
console.log(teaRecipe);

const Recipes = () => {
  const [recipe, setRecipe] = useState({});

  return (
    <div>
      <h3>Current recipe:</h3>
      <button onClick={()=>setRecipe(coffeeRecipe)}>Coffee recipe</button>
      <button onClick={()=>setRecipe(teaRecipe)}>Tea recipe</button>

      <ul>
        {Object.keys(recipe).map(m => (
          <li key={m}>
            {m}: {recipe[m]}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Recipes;