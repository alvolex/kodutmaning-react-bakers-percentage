import "./App.css";
import IngredientList from "./components/IngredientList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bakers percentage</h1>
      </header>
      <main>
        <IngredientList />
      </main>
    </div>
  );
}

export default App;
