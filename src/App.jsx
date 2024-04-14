import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";

function App() {
  return (
    <div className=" flex flex-col bg-black  rounded-3xl  p-10 ">
      <h1 className="  font-bold text-3xl  text-white ">QUADB TODO-LIST</h1>
      <AddTodo />
      <Todos />
    </div>
  );
}

export default App;
