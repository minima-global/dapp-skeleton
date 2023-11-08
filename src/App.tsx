import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://github.com/eliasnemr" target="_blank">
          <img src={viteLogo} className="logo animate-spin" alt="Vite logo" />
        </a>
      </div>
      <h1>MiniDapp Skeleton, (React TS + Vite + TailwindCSS)</h1>
    </>
  );
}

export default App;
