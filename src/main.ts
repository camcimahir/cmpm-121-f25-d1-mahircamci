import "./style.css";

document.body.innerHTML = `
  <h1>Ember Epoch </h1>
`;

interface Item {
  name: string;
  price: number;
  production: number;
  currentPrice: number;
  description: string;
  buttonElement?: HTMLButtonElement;
}

const availableItems: Item[] = [
  {
    name: "flintstone",
    price: 10,
    production: 0.1,
    currentPrice: 10,
    description: "a very small but handy source of continous combustion",
  },
  {
    name: "flamethrower",
    price: 50,
    production: 0.75,
    currentPrice: 50,
    description: "a handheld reliable source of fire",
  },
  {
    name: "furnace",
    price: 100,
    production: 2,
    currentPrice: 100,
    description: "Industrial heat. Great for keeping things *warm*",
  },
  {
    name: "volcano",
    price: 1000,
    production: 50,
    currentPrice: 1000,
    description: "A gentle giant, slumbering... for now",
  },
  {
    name: "supervolcano",
    price: 10000,
    production: 1500,
    currentPrice: 10000,
    description: "volcanos mean brother, you don't want to wake him up",
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

//display the growth rate
const growthRateDisplay = document.createElement("p");
growthRateDisplay.id = "rate";

//the counting number and text
const counterElement = document.createElement("p");
counterElement.id = "counter";
counterElement.textContent = `You have ${counter.toFixed(3)} of fires`;

const upgradeButtonsContainer = document.createElement("div");

//organize buttons vertically
upgradeButtonsContainer.style.display = "flex";
upgradeButtonsContainer.style.flexDirection = "column";
upgradeButtonsContainer.style.gap = "8px"; //add space between them

//display the elements
document.body.appendChild(button);
document.body.appendChild(growthRateDisplay);
document.body.appendChild(counterElement);
document.body.appendChild(upgradeButtonsContainer);

for (const item of availableItems) {
  const upgradeButton = document.createElement("button");
  upgradeButton.id = `buy-${item.name}`;

  upgradeButton.innerHTML =
    `Buy **${item.name}** (+${item.production}/s)🔥<br>` +
    `Price: ${item.currentPrice.toFixed(2)} fires<br>` +
    `<span style="font-size: 0.9em; opacity: 0.7;">Description: ${item.description}</span>`;
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
      item.buttonElement.innerHTML =
        `Buy ${item.name} (+${item.production}/s)🔥<br>` +
        `Price: ${item.currentPrice.toFixed(2)} fires<br>` +
        `<span style="font-size: 0.9em; opacity: 0.7;">Description: ${item.description}</span>`;

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
