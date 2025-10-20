import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <h1>Ember Epoch </h1>
  <!-- <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>-->
`;

let counter: number = 0;
let lastTimestamp: number = 0;
let growthRate: number = 0;
const maxGrowthRate: number = 10;
let UPGRADE_COSTA: number = 10;
let UPGRADE_COSTB: number = 100;
let UPGRADE_COSTC: number = 1000;

//the button
const button = document.createElement("button");
button.id = "increment";
button.textContent = "🔥";

//upgrade button A
const upgradeButtonA = document.createElement("button");
upgradeButtonA.id = "upgradeA";
upgradeButtonA.textContent =
  `Buy flamethrower (+0.1/s)🔥 - Cost: ${UPGRADE_COSTA} fires`;
upgradeButtonA.disabled = true;

//upgrade button B
const upgradeButtonB = document.createElement("button");
upgradeButtonB.id = "upgradeB";
upgradeButtonB.textContent =
  `Buy flamethrower (+2/s)🔥 - Cost: ${UPGRADE_COSTB} fires`;
upgradeButtonB.disabled = true;

//upgrade button C
const upgradeButtonC = document.createElement("button");
upgradeButtonC.id = "upgradeC";
upgradeButtonC.textContent =
  `Buy flamethrower (+50/s)🔥 - Cost: ${UPGRADE_COSTC} fires`;
upgradeButtonC.disabled = true;

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
document.body.appendChild(upgradeButtonA);
document.body.appendChild(upgradeButtonB);
document.body.appendChild(upgradeButtonC);

//updates the display
const updateDisplay = () => {
  counterElement.textContent = `You have ${counter.toFixed(3)} of fires`;
  growthRateDisplay.textContent = `Growth Rate: ${growthRate.toFixed(2)} 🔥/s`;

  upgradeButtonA.textContent = `Buy flamethrower (+0.1/s)🔥 - Cost: ${
    UPGRADE_COSTA.toFixed(2)
  } fires`;
  upgradeButtonB.textContent = `Activate a furnace (+2/s)🔥 - Cost: ${
    UPGRADE_COSTB.toFixed(2)
  } fires`;
  upgradeButtonC.textContent = `Awaken a volcano (+50/s)🔥 - Cost: ${
    UPGRADE_COSTC.toFixed(2)
  } fires`;

  upgradeButtonA.disabled = counter < UPGRADE_COSTA;
  growthRate >= maxGrowthRate;
  upgradeButtonB.disabled = counter < UPGRADE_COSTB ||
    growthRate >= maxGrowthRate;
  upgradeButtonC.disabled = counter < UPGRADE_COSTC ||
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
upgradeButtonA.addEventListener("click", () => {
  if (counter >= UPGRADE_COSTA) {
    counter -= UPGRADE_COSTA;
    UPGRADE_COSTA = UPGRADE_COSTA * 1.15;
    growthRate += 0.1;
    updateDisplay();
  }
});

upgradeButtonB.addEventListener("click", () => {
  if (counter >= UPGRADE_COSTB) {
    counter -= UPGRADE_COSTB;
    UPGRADE_COSTB = UPGRADE_COSTB * 1.15;
    growthRate += 2.0;
    updateDisplay();
  }
});

upgradeButtonC.addEventListener("click", () => {
  if (counter >= UPGRADE_COSTC) {
    counter -= UPGRADE_COSTC;
    UPGRADE_COSTC = UPGRADE_COSTC * 1.15;
    growthRate += 50.0;
    updateDisplay();
  }
});

requestAnimationFrame(renderLoop);
