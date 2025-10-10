import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <h1>CMPM 121 Project</h1>
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

let counter: number = 0;

//the button
const button = document.createElement("button");
button.id = "increment";
button.textContent = "🔥";

//the counting number and text
const counterElement = document.createElement("p");
counterElement.id = "counter";
counterElement.textContent = `You have ${counter} of fires`;

//display the elements
document.body.appendChild(button);
document.body.appendChild(counterElement);

//updates the counter value and display
const updateCounter = () => {
  counter++;
  counterElement.textContent = `You have ${counter} of fires`;
};

//every second it runs update counter
setInterval(updateCounter, 1000);

//every click runs the update counter
button.addEventListener("click", () => {
  // This looks like to a good place to add some logic!
  updateCounter();
  console.log("I have these thingies:", button, counterElement, counter);
});
