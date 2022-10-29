import {createSignal, For} from "solid-js";
import {invoke} from "@tauri-apps/api/tauri";
import {BaseDirectory, readDir, FileEntry} from '@tauri-apps/api/fs';
import "./App.css";

function App() {
    const [greetMsg, setGreetMsg] = createSignal("");
    const [name, setName] = createSignal("");
    const [files, setFiles] = createSignal<Array<FileEntry>>([]);

    async function returnString() {
        const result = await invoke('return_string', {
            word: 'This is the argument'
        });

        alert(result);
    }

    async function greet() {
        // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
        setGreetMsg(await invoke("greet", {name: name()}));
    }

    async function listAllFilesInDirectory() {
        const files = await readDir(name(), {dir: BaseDirectory.Home});
        setFiles(files);
    }

    return (
        <div class="container">
            <p>The directory must be in your $HOME directory</p>
            <div class="row">
                <div>
                    <input
                        id="greet-input"
                        onChange={(e) => setName(e.currentTarget.value)}
                        placeholder="Enter a name..."
                    />
                    <button type="button" onClick={() => returnString()}>
                        Try click
                    </button>
                    <button type="button" onClick={() => listAllFilesInDirectory()}>
                        List files
                    </button>
                </div>

                <p>{greetMsg}</p>
            </div>
            <div class="row">
                <table>
                    <thead>
                    <tr>
                        <td>
                            Filename
                        </td>
                        <td>
                            Path
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <For each={files()}>
                        {(file: FileEntry) => (
                            <tr>
                                <td>{file.name}</td>
                                <td>{file.path}</td>
                            </tr>
                        )}
                    </For>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
