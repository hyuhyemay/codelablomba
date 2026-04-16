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
    <input type="text" class="subject-name" placeholder="Subject / Task Name" />
    <select class="subject-priority">
      <option value="">Priority Level</option>
      <option value="high">High Priority</option>
      <option value="medium">Medium Priority</option>
      <option value="low">Low Priority</option>
    </select>
    <button type="button" class="remove-btn">Remove</button>
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
    duration = "20 minutes";
    advice = "Your energy and focus are both low. Start with a very small session and avoid pressure.";
  } else if (
    (energy === "low" && focus === "medium") ||
    (energy === "medium" && focus === "low")
  ) {
    duration = "25 minutes";
    advice = "Keep the session short and focus on only one important task.";
  } else if (energy === "medium" && focus === "medium") {
    duration = "35 minutes";
    advice = "You are in a fairly balanced condition. Work steadily and take a short break after finishing.";
  } else if (
    (energy === "high" && focus === "medium") ||
    (energy === "medium" && focus === "high")
  ) {
    duration = "45 minutes";
    advice = "You can handle a deeper session today. Start with your top priority subject.";
  } else {
    duration = "60 minutes";
    advice = "You are in a strong condition today. Use this momentum for your hardest and most urgent task.";
  }

  return { duration, advice };
}

function getStudyPersonality(energy, focus) {
  if (energy === "high" && focus === "high") {
    return "The Deep Diver";
  } else if (energy === "medium" && focus === "medium") {
    return "The Balanced Planner";
  } else if (energy === "low" && focus === "low") {
    return "The Survivor";
  } else {
    return "The Sprinter";
  }
}

function getMotivation(energy, focus) {
  if (energy === "low" && focus === "low") {
    return "Small progress is still progress. Start with one simple step.";
  } else if (energy === "high" && focus === "high") {
    return "You are in a strong state today. Use your momentum wisely.";
  } else {
    return "Stay steady. Consistency matters more than perfection.";
  }
}

function getDistractionTip(distraction) {
  if (!distraction) {
    return "Create a clean study environment and remove anything that may interrupt your focus.";
  }

  const value = distraction.toLowerCase();

  if (value.includes("phone") || value.includes("social") || value.includes("instagram")) {
    return "Put your phone on silent or enable focus mode before starting.";
  }

  if (value.includes("sleep") || value.includes("tired") || value.includes("ngantuk")) {
    return "Start with a short session, drink water, and avoid forcing a long study block.";
  }

  if (value.includes("noise") || value.includes("berisik")) {
    return "Use earphones, calming audio, or move to a quieter place.";
  }

  return `Since your main distraction is ${distraction}, reduce it before starting your first session.`;
}

generateBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const energy = energyInput.value;
  const focus = focusInput.value;
  const distraction = distractionInput.value.trim();

  if (!name || !energy || !focus) {
    result.classList.remove("hidden");
    topPriorityText.textContent = "-";
    durationText.textContent = "-";
    personalityText.textContent = "-";
    startNowText.textContent = "-";
    adviceText.textContent = "Please complete your name, energy, and focus first.";
    distractionTipText.textContent = "-";
    rankingList.innerHTML = "";
    motivationText.textContent = "-";
    warningBox.classList.add("hidden");
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
    topPriorityText.textContent = "-";
    durationText.textContent = "-";
    personalityText.textContent = "-";
    startNowText.textContent = "-";
    adviceText.textContent = "Please add at least one subject or task with its priority.";
    distractionTipText.textContent = "-";
    rankingList.innerHTML = "";
    motivationText.textContent = "-";
    warningBox.classList.add("hidden");
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
  startNowText.textContent = `Open your ${mostImportant} material and do the first small task now.`;
  adviceText.textContent = advice;
  distractionTipText.textContent = distractionTip;
  motivationText.textContent = motivation;

  rankingList.innerHTML = "";
  subjects.forEach((subject) => {
    const item = document.createElement("li");
  item.textContent = `${subject.name} (${subject.priority.charAt(0).toUpperCase() + subject.priority.slice(1)} Priority)`;
    rankingList.appendChild(item);
  });

  if (subjects.length >= 4 && energy === "low") {
    warningBox.textContent = "⚠️ Burnout warning: you have many tasks while your energy is low. Start small and focus only on the top priority task first.";
    warningBox.classList.remove("hidden");
  } else {
    warningBox.classList.add("hidden");
  }

  result.classList.remove("hidden");
});

resetBtn.addEventListener("click", () => {
  nameInput.value = "";
  energyInput.value = "";
  focusInput.value = "";
  distractionInput.value = "";

  subjectsContainer.innerHTML = `
    <div class="subject-item">
      <input type="text" class="subject-name" placeholder="Subject / Task Name" />
      <select class="subject-priority">
        <option value="">Priority Level</option>
        <option value="high">High Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="low">Low Priority</option>
      </select>
      <button type="button" class="remove-btn">Remove</button>
    </div>
  `;

  result.classList.add("hidden");
  generateBtn.disabled = true;
});