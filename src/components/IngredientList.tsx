import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import "../styles/IngredientList.scss";

/* 
    Getting started:
    You will need to clone the repo and run "npm install" and "npm start" to install the needed packages and then start the project.
    The only component you need to change is IngredientList.tsx. You can find it in the src/components folder.
    Feel free to add any other files you need. You can also change the styles in the styles folder.
    The InputField.tsx component will handle changes to the input fields. You don't need to change it unless you want to.

    Info:
    - The first ingredient is always flour and will be locked, you can only change the weight of it.
    - Flour weight is always considered 100%. The other ingredients are calculated based on the flour weight.

    More info:
    https://en.wikipedia.org/wiki/Baker_percentage

    Challenges:
    1. Calculate the percentages of the different ingredients based on the flour weight of all the ingredients in the ingredientList.
    2. If you change the weight of an ingredient, recalculate the percentage of that ingredient.
    3. If the flour weight changes, calculate the new weights of the other ingredients based on their percentages.
    Example:
      If we start off with 100g of flour and 5g of yeast, the yeast percentage is 5%.
      If we change the flour weight to 200g, the yeast weight should now be 10g, since that's 5% of 200.

    3. Add a button to remove an ingredient
    4. Add a button to add a new ingredient. Make sure to give it a unique id.
*/

export type Ingredient = {
  name: string;
  weight: number;
  percentage: number;
  id: number;
};

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
  const [ingredientList, setIngredientList] = useState<Ingredient[]>(ingredientExampleData || []);

  //Helper function that handles the change of an input field.
  //You don't need to change this function.
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    changeType: "name" | "weight"
  ) => {
    e.preventDefault();
    const newIngredientList = ingredientList.map((ingredient) => {
      if (ingredient.id === id) {
        switch (changeType) {
          case "name":
            ingredient.name = e.target.value;
            break;
          case "weight":
            ingredient.weight = Number(e.target.value);
            break;
        }
      }
      return ingredient;
    });
    setIngredientList(newIngredientList);

    if (changeType === "name") return;
    id === 0 ? calculateWeights() : calculatePercentages();
  };

  const calculatePercentages = () => {
    //Challenge: Calculate percentages based on flour weight
    const flourWeight = ingredientList[0].weight;

    //EXAMPLE CODE:
    const newIngredientList = ingredientList.map((ingredient) => {
      ingredient.percentage = (ingredient.weight / flourWeight) * 100;
      return ingredient;
    });
    setIngredientList(newIngredientList);
  };

  const calculateWeights = () => {
    //Challenge: If the flour weight changes, calculate the new weights of the other ingredients.
    const flourWeight = ingredientList[0].weight;

    //EXAMPLE CODE:
    const newIngredientList = ingredientList.map((ingredient) => {
      ingredient.weight = (ingredient.percentage / 100) * flourWeight;
      return ingredient;
    });
    setIngredientList(newIngredientList);
  };

  const addIngredient = () => {
    //Bonus challenge: Add a button to add a new ingredient. Make sure to give it a unique id.

    //EXAMPLE CODE:
    const newIngredientList = [...ingredientList];
    newIngredientList.push({
      name: "New ingredient",
      weight: 0,
      percentage: 0,
      id: ingredientList[ingredientList.length - 1].id + 1,
    });
    setIngredientList(newIngredientList);
  };

  const removeIngredient = (id: number) => {
    //Bonus challenge: Add a button to remove an ingredient

    //EXAMPLE CODE:
    const newIngredientList = ingredientList.filter(
      (ingredient) => ingredient.id !== id
    );
    setIngredientList(newIngredientList);
  };

  useEffect(() => {
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
      calculatePercentages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
