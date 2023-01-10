import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import "../styles/IngredientList.scss";

/* 
  Getting started:
  You will need to clone the repo and run either "npm install" and "npm start" or "yarn" and "yarn start" to install the needed packages and then start the project.
  The project will be accesible at localhost://3000
  The only component you need to change is IngredientList.tsx. You can find it in the src/components folder.
  Feel free to add any other files you need. You can also change the styles in the styles folder.
  The InputField.tsx component will handle changes to the input fields. You don't need to change it unless you want to.
  This challenge is a CRUD app quite similar to a to-do list, but instead of tasks we have ingredients that we have to do calculations on.
  
  Info:
  - The first ingredient should always be flour and will be locked, you can only change the weight of this field.
  - Flour weight is always considered 100%. The other ingredients are calculated based on the flour weight. (Example further down)
  More info about baker percentages:
  https://en.wikipedia.org/wiki/Baker_percentage
  Your task is to fill in the following functions:
  - calculatePercentages
  - calculateWeights
  - addIngredient (bonus)
  - removeIngredient (bonus)
  Challenges:
  1. Calculate the percentages of the different ingredients based on the flour weight of all the ingredients in the ingredientList.
  2. If you change the weight of an ingredient, recalculate the percentage of that ingredient.
  3. If the flour weight changes, calculate the new weights of the other ingredients based on their percentages.
  Example:
    If we start off with 100g of flour, 5g of yeast, and 200g of water, then the yeast percentage is 5% and water is 200%.
    If we change the flour weight to 200g, the yeast weight should now be 10g, since that's 5% of 200 and the water should be 400g.
  Bonus challenges:
  1. Add logic to the "Remove" button.
  2. Add logic to the "New ingredient" button. Make sure to give it a unique id.
*/

export type Ingredient = {
  name: string;
  weight: number;
  percentage: number;
  id: number;
};
type IngredientKeys = keyof Ingredient;

const ingredientExampleData: Ingredient[] = [
  {
    name: "Flour",
    weight: 100,
    percentage: 100,
    id: 0,
  },
  {
    name: "Yeast",
    weight: 5,
    percentage: 0,
    id: 1,
  },
  {
    name: "Water",
    weight: 30,
    percentage: 0,
    id: 2,
  },
  {
    name: "Sugar",
    weight: 250,
    percentage: 0,
    id: 3,
  },
];

const IngredientList = () => {
  const [ingredientList, setIngredientList] = useState<Ingredient[]>( ingredientExampleData || []);
  
  //Challenge: Calculate percentages based on flour weight and then call the setIngredientList
  //function with the updated values. You can access the flour weight from the first element in the ingredientArray.
  const calculatePercentages = (ingredientArray: Ingredient[]) => {
    const flourWeight = ingredientArray[0].weight;
    /* 
      ... 
    */
    setIngredientList(ingredientArray);
  };

    
  //Challenge: If the flour weight changes, calculate the new weights of the other ingredients and then call the setIngredientList
  //function with the updated values. 
  const calculateWeights = (ingredientArray: Ingredient[]) => {
    const flourWeight = ingredientArray[0].weight;
    /*
      ... 
    */
    setIngredientList(ingredientArray);
  };

  //Bonus challenge: Add logic so that this function adds a new ingredient to the list. Make sure to give it a unique id.
  const addIngredient = () => {
  };

  //Bonus challenge: Add logic to this function so that it removes the ingredient with the given id from the list.
  const removeIngredient = (id: number) => {
  };


  /* The functions below this line is only helper functions, you don't need to make changes to these unless you want to. */
  useEffect(() => {
    //This useEffect will run when the component mounts and makes sure we have atleast one ingredient in the list.
    if (ingredientList.length === 0) {
      setIngredientList([
        {
          name: "Flour",
          weight: 100,
          percentage: 100,
          id: 0,
        },
      ]);
    } else {
      calculatePercentages(ingredientList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    //Helper function that handles the change of an input fields.
    e.preventDefault();
    const updatedIngredientList = ingredientList.map((ingredient) => {
      if (ingredient.id === id) {
        let ingredientCopy = { ...ingredient };
        if (typeof ingredientCopy[e.target.name as IngredientKeys] === "string") {
          return { ...ingredientCopy, [e.target.name]: e.target.value };
        } else {
          return { ...ingredientCopy, [e.target.name]: Number(e.target.value) };
        }
      }
      return ingredient;
    });

    if (e.target.name === "name") {
      setIngredientList(updatedIngredientList);
      return;
    }
    id === 0 ? calculateWeights(updatedIngredientList) : calculatePercentages(updatedIngredientList);
  };


  return (
    <>
      {ingredientList.map((ingredient, i) => (
        <span className="input-field" key={ingredient.id}>
          <InputField
            ingredient={ingredient}
            handleChange={handleChange}
            isLocked={i === 0}
          />
          <button
            onClick={() => removeIngredient(ingredient.id)}
            className="remove-button"
            disabled={i === 0}
          >
            X
          </button>
        </span>
      ))}

      <button className="ingredient-button" onClick={() => addIngredient()}>
        Add new ingredient
      </button>
    </>
  );
};

export default IngredientList;
