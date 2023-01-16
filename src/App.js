import { Toaster } from "react-hot-toast";
import "./App.css";
import logo from "./logo.svg";
function App() {
  return (
    <div className="App">
      <div>
        <Toaster />
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 class="text-3xl font-bold underline">Hello world!</h1>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
