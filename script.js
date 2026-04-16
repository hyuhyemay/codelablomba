const enterBtn = document.getElementById("enterBtn");
const landingPage = document.getElementById("landingPage");
const plannerPage = document.getElementById("plannerPage");

const addSubjectBtn = document.getElementById("addSubjectBtn");
const subjectsContainer = document.getElementById("subjectsContainer");

const generateBtn = document.getElementById("generateBtn");
const resetBtn = document.getElementById("resetBtn");

const result = document.getElementById("result");

const topPriorityText = document.getElementById("topPriorityText");
const durationText = document.getElementById("durationText");
const personalityText = document.getElementById("personalityText");
const startNowText = document.getElementById("startNowText");
const adviceText = document.getElementById("adviceText");
const distractionTipText = document.getElementById("distractionTipText");
const rankingList = document.getElementById("rankingList");
const motivationText = document.getElementById("motivationText");
const warningBox = document.getElementById("warningBox");

const nameInput = document.getElementById("name");
const energyInput = document.getElementById("energy");
const focusInput = document.getElementById("focus");
const distractionInput = document.getElementById("distraction");

enterBtn.addEventListener("click", () => {
  landingPage.classList.add("hidden");
  plannerPage.classList.remove("hidden");
});

function createSubjectRow() {
  const subjectItem = document.createElement("div");
  subjectItem.classList.add("subject-item");

  subjectItem.innerHTML = `
    <input type="text" class="subject-name" placeholder="Nama Mata Pelajaran / Tugas" />
    <select class="subject-priority">
      <option value="">Tingkat Prioritas</option>
      <option value="high">Tinggi</option>
      <option value="medium">Sedang</option>
      <option value="low">Rendah</option>
    </select>
    <button type="button" class="remove-btn">Hapus</button>
  `;

  subjectsContainer.appendChild(subjectItem);
}

addSubjectBtn.addEventListener("click", () => {
  createSubjectRow();
});

subjectsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-btn")) {
    const allRows = document.querySelectorAll(".subject-item");

    if (allRows.length > 1) {
      event.target.parentElement.remove();
    } else {
      const currentRow = event.target.parentElement;
      currentRow.querySelector(".subject-name").value = "";
      currentRow.querySelector(".subject-priority").value = "";
    }
  }
});

function checkForm() {
  if (
    nameInput.value.trim() &&
    energyInput.value &&
    focusInput.value
  ) {
    generateBtn.disabled = false;
  } else {
    generateBtn.disabled = true;
  }
}

nameInput.addEventListener("input", checkForm);

energyInput.addEventListener("change", () => {
  checkForm();
  updateEnergyTheme();
});

focusInput.addEventListener("change", checkForm);

function updateEnergyTheme() {
  plannerPage.classList.remove("low-energy");

  if (energyInput.value === "low") {
    plannerPage.classList.add("low-energy");
  }
}

function getStudyDurationAndAdvice(energy, focus) {
  let duration = "";
  let advice = "";

  if (energy === "low" && focus === "low") {
    duration = "20 menit";
    advice = "Energi dan fokus kamu lagi rendah. Mulai dari sedikit dulu ya.";
  } else if (
    (energy === "low" && focus === "medium") ||
    (energy === "medium" && focus === "low")
  ) {
    duration = "25 menit";
    advice = "Fokus ke satu tugas penting saja dulu.";
  } else if (energy === "medium" && focus === "medium") {
    duration = "35 menit";
    advice = "Kondisimu cukup stabil. Kerjakan dengan santai tapi konsisten.";
  } else if (
    (energy === "high" && focus === "medium") ||
    (energy === "medium" && focus === "high")
  ) {
    duration = "45 menit";
    advice = "Kamu lagi cukup fokus, gas ke tugas penting.";
  } else {
    duration = "60 menit";
    advice = "Kondisi lagi optimal, kerjain yang paling sulit sekarang.";
  }

  return { duration, advice };
}

function getStudyPersonality(energy, focus) {
  if (energy === "high" && focus === "high") {
    return "Si Fokus Maksimal";
  } else if (energy === "medium" && focus === "medium") {
    return "Si Seimbang";
  } else if (energy === "low" && focus === "low") {
    return "Si Bertahan";
  } else {
    return "Si Ngebut";
  }
}

function getMotivation(energy, focus) {
  if (energy === "low" && focus === "low") {
    return "Pelan-pelan gapapa, yang penting mulai.";
  } else if (energy === "high" && focus === "high") {
    return "Lagi bagus nih, manfaatin momen ini!";
  } else {
    return "Yang penting konsisten, bukan sempurna.";
  }
}

function getDistractionTip(distraction) {
  if (!distraction) {
    return "Bikin tempat belajar yang minim gangguan ya.";
  }

  const value = distraction.toLowerCase();

  if (value.includes("phone") || value.includes("sosial")) {
    return "Jauhkan HP dulu atau aktifkan mode fokus.";
  }

  if (value.includes("ngantuk")) {
    return "Mulai dari sebentar dulu, minum air biar fresh.";
  }

  if (value.includes("berisik")) {
    return "Cari tempat lebih tenang atau pakai earphone.";
  }

  return `Kurangi gangguan ${distraction} sebelum mulai belajar ya.`;
}

generateBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const energy = energyInput.value;
  const focus = focusInput.value;
  const distraction = distractionInput.value.trim();

  if (!name || !energy || !focus) {
    result.classList.remove("hidden");
    adviceText.textContent = "Isi dulu nama, energi, dan fokus ya.";
    return;
  }

  const subjectNames = document.querySelectorAll(".subject-name");
  const subjectPriorities = document.querySelectorAll(".subject-priority");

  let subjects = [];

  for (let i = 0; i < subjectNames.length; i++) {
    const subjectName = subjectNames[i].value.trim();
    const subjectPriority = subjectPriorities[i].value;

    if (subjectName && subjectPriority) {
      subjects.push({
        name: subjectName,
        priority: subjectPriority
      });
    }
  }

  if (subjects.length === 0) {
    result.classList.remove("hidden");
    adviceText.textContent = "Tambahkan minimal satu tugas ya.";
    return;
  }

  const priorityRank = {
    high: 3,
    medium: 2,
    low: 1
  };

  subjects.sort((a, b) => priorityRank[b.priority] - priorityRank[a.priority]);

  const mostImportant = subjects[0].name;
  const { duration, advice } = getStudyDurationAndAdvice(energy, focus);
  const personality = getStudyPersonality(energy, focus);
  const motivation = getMotivation(energy, focus);
  const distractionTip = getDistractionTip(distraction);

  topPriorityText.textContent = mostImportant;
  durationText.textContent = duration;
  personalityText.textContent = personality;
  startNowText.textContent = `Mulai dari ${mostImportant} sekarang ya.`;
  adviceText.textContent = advice;
  distractionTipText.textContent = distractionTip;
  motivationText.textContent = motivation;

  rankingList.innerHTML = "";
  subjects.forEach((subject) => {
    const item = document.createElement("li");
    item.textContent = `${subject.name} (Prioritas ${subject.priority})`;
    rankingList.appendChild(item);
  });

  result.classList.remove("hidden");
});

resetBtn.addEventListener("click", () => {
  location.reload();
});
