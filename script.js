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
