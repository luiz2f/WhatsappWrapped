import "./App.css";
import HomePage from "./HomePage.jsx";
import { DataProvider } from "./context/dataContext.jsx";

function App() {
  return (
    <DataProvider>
      <HomePage />
    </DataProvider>
  );
}

export default App;
