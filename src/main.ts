import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <h1>CMPM 121 Project</h1>
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

let counter: number = 0;
let lastTimestamp: number = 0;
let growthRate: number = 0;
const maxGrowthRate: number = 10;
const UPGRADE_COST: number = 10;

//the button
const button = document.createElement("button");
button.id = "increment";
button.textContent = "🔥";

//upgrade button
const upgradeButton = document.createElement("button");
upgradeButton.id = "upgrade";
upgradeButton.textContent =
  `Buy flamethrower (+1/s)🔥 - Cost: ${UPGRADE_COST} fires`;
upgradeButton.disabled = true;

//display the growth rate
const growthRateDisplay = document.createElement("p");
growthRateDisplay.id = "rate";

//the counting number and text
const counterElement = document.createElement("p");
counterElement.id = "counter";
counterElement.textContent = `You have ${counter.toFixed(3)} of fires`;

//display the elements
document.body.appendChild(button);
document.body.appendChild(growthRateDisplay);
document.body.appendChild(counterElement);
document.body.appendChild(upgradeButton);

//updates the display
const updateDisplay = () => {
  counterElement.textContent = `You have ${counter.toFixed(3)} of fires`;
  growthRateDisplay.textContent =
    `Current automatic rate level is ${growthRate}`;
  upgradeButton.disabled = counter < UPGRADE_COST ||
    growthRate >= maxGrowthRate;
};

const renderLoop = (timestamp: number) => {
  //initialize time stamp
  if (lastTimestamp === 0) {
    lastTimestamp = timestamp;
  }

  //determine elapsed time for seconds
  const deltaTimeMs = timestamp - lastTimestamp;
  const elapsedSeconds = deltaTimeMs / 1000;

  const increaseAmount = elapsedSeconds * growthRate;

  counter += increaseAmount;
  updateDisplay();

  lastTimestamp = timestamp;

  requestAnimationFrame(renderLoop);
};

//every click runs the update counter
button.addEventListener("click", () => {
  counter++;
  updateDisplay();
  console.log("I have these thingies:", button, counterElement, counter);
});

//upgrade button logic
upgradeButton.addEventListener("click", () => {
  if (counter >= UPGRADE_COST) {
    counter -= UPGRADE_COST;
    growthRate += 1;
    updateDisplay();
  }
});

requestAnimationFrame(renderLoop);
