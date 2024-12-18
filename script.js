// Dados dos alunos (simulando o JSON fornecido)
const studentsData = {
  "Ana Luiza": { prova: 24, redacao: 20 },
  "Arthur Baradelli": { prova: 12, redacao: 10 },
  Daniel: { prova: 20, redacao: 16 },
  Danielle: { prova: 13, redacao: 20 },
  "Isabella Ferreira": { prova: 22, redacao: 10 },
  "Kamilly Soares": { prova: 13, redacao: 12 },
  "Kauanny Soares": { prova: 13, redacao: 12 },
  "Laura Beatriz": { prova: 25, redacao: 18 },
  Manuella: { prova: 19, redacao: 18 },
  "Marcus Ferreira": { prova: 20, redacao: null },
  Ryan: { prova: 15, redacao: 10 },
  "Vyctor Seixas": { prova: 17, redacao: null },
};
// Senhas fixas para cada aluno
const passwords = {
  "Ana Luiza": "7fY2qP9A",
  "Arthur Baradelli": "pK3nQzF0",
  Daniel: "gT5sA8jH",
  Danielle: "Xy4m9CtZ",
  "Isabella Ferreira": "bA1sC7qR",
  "Kamilly Soares": "hJ3nTk9L",
  "Kauanny Soares": "Z0yP6BvX",
  "Laura Beatriz": "Lq4S8w3H",
  Manuella: "G3Jz8YkW",
  "Marcus Ferreira": "Qe6Hn2Lp",
  Ryan: "Vf9Aq0Tz",
  "Vyctor Seixas": "W4mJ1dRr",
};

// Seletores
const nameSelect = document.getElementById("name");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const errorMessage = document.getElementById("error-message");

const loginContainer = document.querySelector(".login-container");
const resultContainer = document.querySelector(".result-container");
const studentNameDisplay = document.getElementById("student-name");
const scoresDisplay = document.getElementById("scores");
const logoutBtn = document.getElementById("logout-btn");

// Preencher o select com os nomes
Object.keys(studentsData).forEach((name) => {
  const option = document.createElement("option");
  option.value = name;
  option.textContent = name;
  nameSelect.appendChild(option);
});

// Ordena os alunos pela pontuação total (prova+redacao)
function getTopThree() {
  const scoresArray = Object.entries(studentsData).map(([name, data]) => {
    const prova = data.prova || 0;
    const redacao = data.redacao || 0;
    const total = prova + redacao;
    return { name, total };
  });

  scoresArray.sort((a, b) => b.total - a.total);

  return scoresArray.slice(0, 3);
}

// Mostra o placar top 3
function showTopThree() {
  const topThree = getTopThree();
  const placements = [
    document.querySelector(".score-item.first"),
    document.querySelector(".score-item.second"),
    document.querySelector(".score-item.third"),
  ];

  topThree.forEach((item, index) => {
    const nameElem = placements[index].querySelector(".name");
    const pointsElem = placements[index].querySelector(".points");
    nameElem.textContent = item.name;
    pointsElem.textContent = `${item.total} pts`;
  });
}

showTopThree();

// Evento de login
loginBtn.addEventListener("click", () => {
  const selectedName = nameSelect.value;
  const enteredPassword = passwordInput.value.trim();

  if (enteredPassword === passwords[selectedName]) {
    showResults(selectedName);
  } else {
    errorMessage.textContent = "Nome ou senha incorretos!";
  }
});

function showResults(name) {
  const data = studentsData[name];
  const prova = data.prova || 0;
  const redacao = data.redacao || 0;
  const total = prova + redacao;

  loginContainer.style.display = "none";
  resultContainer.style.display = "flex";

  studentNameDisplay.textContent = name;
  scoresDisplay.innerHTML = `
    <strong>Prova:</strong> ${prova}<br>
    <strong>Redação:</strong> ${redacao}<br><br>
    <strong>Total:</strong> ${total}
  `;
}

// Evento de logout
logoutBtn.addEventListener("click", () => {
  passwordInput.value = "";
  errorMessage.textContent = "";
  resultContainer.style.display = "none";
  loginContainer.style.display = "flex";
});
