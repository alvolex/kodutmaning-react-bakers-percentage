import "../styles/InputField.scss";
import { Ingredient } from "./IngredientList";

type Props = {
  ingredient: Ingredient;
  isLocked?: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => void;
};

const InputField: React.FC<Props> = ({
  ingredient: { name, weight, percentage, id },
  isLocked = false,
  handleChange,
}) => {
  return (
    <>
      <form className="input-form">
        <input
          type="text"
          placeholder="Flour"
          value={isLocked ? "Flour" : name}
          disabled={isLocked}
          name="name"
          onChange={(e) => handleChange(e, id)}
        />
        <input
          type="number"
          placeholder="Weight"
          value={weight.toString()}
          name="weight"
          onChange={(e) => handleChange(e, id)} 
        />
        <input
          type="text"
          placeholder="%"
          value={
            (percentage % 1 === 0 ? percentage : percentage.toFixed(1)) + "%"
          }
          disabled
        />
      </form>
    </>
  );
};

export default InputField;
