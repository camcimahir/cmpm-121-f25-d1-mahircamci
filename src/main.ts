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

// ------------------- GAME STATE -------------------
interface GameState {
  counter: number;
  lastTimestamp: number;
  growthRate: number;
  //maxGrowthRate: number = 10; I removed the max growth rate you
}

const gameState: GameState = {
  counter: 0,
  lastTimestamp: 0,
  growthRate: 0,
};

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

// ------------------- UI ELEMENTS -------------------
let button!: HTMLButtonElement;
let counterElement: HTMLParagraphElement;
let growthRateDisplay: HTMLParagraphElement;
let upgradeButtonsContainer: HTMLDivElement;

function createUIElements() {
  //main button
  button = document.createElement("button");
  button.id = "increment";
  button.textContent = "🔥";

  //the counting number and text
  counterElement = document.createElement("p");
  counterElement.id = "counter";
  counterElement.textContent = `You have ${
    gameState.counter.toFixed(3)
  } of fires`;

  //growth rate
  growthRateDisplay = document.createElement("p");
  growthRateDisplay.id = "rate";

  upgradeButtonsContainer = document.createElement("div");
  upgradeButtonsContainer.style.display = "flex";
  upgradeButtonsContainer.style.flexDirection = "column"; //organize buttons vertically
  upgradeButtonsContainer.style.gap = "8px"; //add space between them

  //display the elements
  document.body.appendChild(button);
  document.body.appendChild(growthRateDisplay);
  document.body.appendChild(counterElement);
  document.body.appendChild(upgradeButtonsContainer);
}

function createUpgradeButtons() {
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
      handleUpgradePurchase(item);
    });
  }
}

//updates the display
const updateDisplay = () => {
  counterElement.textContent = `You have ${
    gameState.counter.toFixed(3)
  } of fires`;
  growthRateDisplay.textContent = `Growth Rate: ${
    gameState.growthRate.toFixed(2)
  } 🔥/s`;

  for (const item of availableItems) {
    if (item.buttonElement) {
      item.buttonElement.innerHTML =
        `Buy ${item.name} (+${item.production}/s)🔥<br>` +
        `Price: ${item.currentPrice.toFixed(2)} fires<br>` +
        `<span style="font-size: 0.9em; opacity: 0.7;">Description: ${item.description}</span>`;

      // Simplified disable logic using item data
      item.buttonElement.disabled = gameState.counter < item.currentPrice;
    }
  }
};

const renderLoop = (timestamp: number) => {
  //initialize time stamp
  if (gameState.lastTimestamp === 0) {
    gameState.lastTimestamp = timestamp;
  }

  //determine elapsed time for seconds
  const deltaTimeMs = timestamp - gameState.lastTimestamp;
  const elapsedSeconds = deltaTimeMs / 1000;

  const increaseAmount = elapsedSeconds * gameState.growthRate;

  gameState.counter += increaseAmount;
  updateDisplay();

  gameState.lastTimestamp = timestamp;

  requestAnimationFrame(renderLoop);
};

createUIElements();
createUpgradeButtons();
button.addEventListener("click", () => {
  gameState.counter++;
  updateDisplay();
});
requestAnimationFrame(renderLoop);

function handleUpgradePurchase(item: Item) {
  if (gameState.counter >= item.currentPrice) {
    gameState.counter -= item.currentPrice;
    item.currentPrice *= 1.15;
    gameState.growthRate += item.production;
    updateDisplay();
  }
}
