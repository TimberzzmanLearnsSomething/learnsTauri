import { createSignal } from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = createSignal("");
  const [name, setName] = createSignal("");

  async function returnString() {
      const result = await invoke('return_string', {
          word: 'This is the argument'
      });

      alert(result);
  }

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name: name() }));
  }

  return (
    <div class="container">
      <h1>Welcome to Tauri!</h1>

      <div class="row">
          <a href="https://solidjs.com" target="_blank">
            <img src={logo} class="logo solid" alt="Solid logo" />
          </a>
      </div>

      <div class="row">
        <div>
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <button type="button" onClick={() => greet()}>
            Greet
          </button>
          <button type="button" onClick={() => returnString()}>
            Try click
          </button>
        </div>
      </div>

      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
