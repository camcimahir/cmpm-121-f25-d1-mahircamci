import "./style.css";

document.body.innerHTML = `
  <h1>Ember Epoch </h1>
`;

interface Item {
  name: string;
  price: number;
  production: number;
  currentPrice: number;
  buttonElement?: HTMLButtonElement;
}

const availableItems: Item[] = [
  {
    name: "flamethrower",
    price: 10,
    production: 0.1,
    currentPrice: 10,
  },
  {
    name: "furnace",
    price: 100,
    production: 2,
    currentPrice: 100,
  },
  {
    name: "volcano",
    price: 1000,
    production: 50,
    currentPrice: 1000,
  },
];

let counter: number = 0;
let lastTimestamp: number = 0;
let growthRate: number = 0;
//const maxGrowthRate: number = 10; I removed the max growth rate

//the button
const button = document.createElement("button");
button.id = "increment";
button.textContent = "🔥";

// //upgrade button A
// const upgradeButtonA = document.createElement("button");
// upgradeButtonA.id = "upgradeA";
// upgradeButtonA.textContent =
//   `Buy flamethrower (+0.1/s)🔥 - Cost: ${UPGRADE_COSTA} fires`;
// upgradeButtonA.disabled = true;

// //upgrade button B
// const upgradeButtonB = document.createElement("button");
// upgradeButtonB.id = "upgradeB";
// upgradeButtonB.textContent =
//   `Buy flamethrower (+2/s)🔥 - Cost: ${UPGRADE_COSTB} fires`;
// upgradeButtonB.disabled = true;

// //upgrade button C
// const upgradeButtonC = document.createElement("button");
// upgradeButtonC.id = "upgradeC";
// upgradeButtonC.textContent =
//   `Buy flamethrower (+50/s)🔥 - Cost: ${UPGRADE_COSTC} fires`;
// upgradeButtonC.disabled = true;

//display the growth rate
const growthRateDisplay = document.createElement("p");
growthRateDisplay.id = "rate";

//the counting number and text
const counterElement = document.createElement("p");
counterElement.id = "counter";
counterElement.textContent = `You have ${counter.toFixed(3)} of fires`;

const upgradeButtonsContainer = document.createElement("div");

//display the elements
document.body.appendChild(button);
document.body.appendChild(growthRateDisplay);
document.body.appendChild(counterElement);
document.body.appendChild(upgradeButtonsContainer);

for (const item of availableItems) {
  const upgradeButton = document.createElement("button");
  upgradeButton.id = `buy-${item.name}`;
  upgradeButton.textContent =
    `Buy ${item.name} (+${item.production}/s)🔥 - Price: ${
      item.currentPrice.toFixed(2)
    } fires`;
  upgradeButton.disabled = true;

  item.buttonElement = upgradeButton;

  upgradeButtonsContainer.appendChild(upgradeButton);

  upgradeButton.addEventListener("click", () => {
    if (counter >= item.currentPrice) {
      counter -= item.currentPrice;
      item.currentPrice *= 1.15;
      growthRate += item.production;
      updateDisplay();
    }
  });
}

//updates the display
const updateDisplay = () => {
  counterElement.textContent = `You have ${counter.toFixed(3)} of fires`;
  growthRateDisplay.textContent = `Growth Rate: ${growthRate.toFixed(2)} 🔥/s`;

  for (const item of availableItems) {
    if (item.buttonElement) {
      item.buttonElement.textContent =
        `Buy ${item.name} (+${item.production}/s)🔥 - Price: ${
          item.currentPrice.toFixed(2)
        } fires`;

      // Simplified disable logic using item data
      item.buttonElement.disabled = counter < item.currentPrice;
    }
  }
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

requestAnimationFrame(renderLoop);
