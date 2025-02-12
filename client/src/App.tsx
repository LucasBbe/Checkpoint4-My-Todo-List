import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import MenuComponent from "./components/Menu/MenuComponent";

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="the-main">
        <MenuComponent />
        <Outlet />
      </main>
    </>
  );
}

export default App;
