const policies = [
  { name: "Invest in rural schools", equity: +15, budget: -20, msg: "You improved access to education!" },
  { name: "Cut scholarship funding", equity: -10, budget: +30, msg: "Funds saved, but equity worsened." },
  { name: "Provide free lunch", equity: +10, budget: -10, msg: "Children are happier and study better!" },
  { name: "Tech for all students", equity: +20, budget: -25, msg: "Digital divide reduced!" },
  { name: "Raise tuition fees", equity: -20, budget: +25, msg: "Revenue increased, but many drop out." }
];

let equity = 50, budget = 100, turn = 1;

const menu = document.getElementById("menu-screen");
const game = document.getElementById("game-screen");
const result = document.getElementById("result-screen");

document.getElementById("start-btn").onclick = startGame;
document.getElementById("restart-btn").onclick = () => location.reload();

function startGame() {
  menu.classList.add("hidden");
  game.classList.remove("hidden");
  renderCards();
  updateStats();
}

function renderCards() {
  const container = document.getElementById("cards-container");
  container.innerHTML = "";
  const options = [...policies].sort(() => Math.random() - 0.5).slice(0, 3);
  options.forEach(policy => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h3>${policy.name}</h3>`;
    card.onclick = () => choosePolicy(policy);
    container.appendChild(card);
  });
}

function choosePolicy(policy) {
  equity = Math.min(100, Math.max(0, equity + policy.equity));
  budget += policy.budget;
  alert(policy.msg);

  turn++;
  if (turn > 10 || budget < 0 || equity <= 0) {
    endGame();
  } else {
    updateStats();
    renderCards();
  }
}

function updateStats() {
  document.getElementById("equity").innerText = equity;
  document.getElementById("budget").innerText = budget;
  document.getElementById("turn").innerText = turn;
}

function endGame() {
  game.classList.add("hidden");
  result.classList.remove("hidden");

  const title = document.getElementById("result-title");
  const msg = document.getElementById("result-message");

  if (equity >= 70 && budget >= 0) {
    title.innerText = "🎉 You built an Equal Path!";
    msg.innerText = "Your balanced policies promoted education equity and sustainability.";
  } else {
    title.innerText = "😢 Inequality persists...";
    msg.innerText = "Try again — can you balance fairness and finance better?";
  }
}
