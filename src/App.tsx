import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <a href="https://github.com/eliasnemr" target="_blank">
          <img
            src={viteLogo}
            className="logo animate-pulse inline"
            alt="Vite logo"
          />
        </a>
      </div>
      <h1 className="text-lg text-blue-400">
        MiniDapp Skeleton, <br />
        (React TS + Vite + TailwindCSS)
      </h1>
    </>
  );
}

export default App;
