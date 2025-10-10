import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <h1>CMPM 121 Project</h1>
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

let counter: number = 0;

const button = document.createElement('button');
button.id = "increment";
button.textContent = "🔥";


const counterElement = document.createElement('span');
counterElement.id = "counter";
counterElement.textContent = counter.toString();

document.body.appendChild(button);
document.body.appendChild(counterElement);

button.addEventListener("click", () => {
  // This looks like to a good place to add some logic!
  counter++;
  counterElement.textContent = counter.toString();
  console.log("I have these thingies:", button, counterElement, counter);
});
