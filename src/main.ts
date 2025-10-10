import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <h1>CMPM 121 Project</h1>
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

let counter: number = 0;
let lastTimestamp: number = 0;

//the button
const button = document.createElement("button");
button.id = "increment";
button.textContent = "🔥";

//the counting number and text
const counterElement = document.createElement("p");
counterElement.id = "counter";
counterElement.textContent = `You have ${counter.toFixed(3)} of fires`;

//display the elements
document.body.appendChild(button);
document.body.appendChild(counterElement);

//updates the counter value and display
//const updateCounter = () => {
//  counter++;
//  counterElement.textContent = `You have ${counter} of fires`;
//};

const renderLoop = (timestamp: number) => {
  //initialize time stamp
  if (lastTimestamp === 0) {
    lastTimestamp = timestamp;
  }

  //determine elapsed time for seconds
  const deltaTimeMs = timestamp - lastTimestamp;
  const elapsedSeconds = deltaTimeMs / 1000;

  counter += elapsedSeconds;
  counterElement.textContent = `You have ${counter.toFixed(3)} of fires`;

  lastTimestamp = timestamp;

  requestAnimationFrame(renderLoop);
};

//every click runs the update counter
button.addEventListener("click", () => {
  counter++;
  counterElement.textContent = `You have ${counter.toFixed(3)} of fires`;
  console.log("I have these thingies:", button, counterElement, counter);
});

requestAnimationFrame(renderLoop);
