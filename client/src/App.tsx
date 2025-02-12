import { Outlet } from "react-router-dom";
import "./App.css";
import MenuComponent from "./components/Menu/MenuComponent";

function App() {
  return (
    <>
      <header>
        <img src="" alt="Logo du site ToDoLo" />
      </header>
      <main className="the-main">
        <MenuComponent />
        <Outlet />
      </main>
    </>
  );
}

export default App;
