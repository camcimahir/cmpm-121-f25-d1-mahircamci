import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <h1>CMPM 121 Project</h1>
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
  <p>Counter: <span id="counter">0</span></p>
  <button id="increment">Click Me!</button>
`;
