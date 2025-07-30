const form = document.querySelector(".search-form");
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.querySelector(".close-modal");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const marka = form.querySelector('select[name="marka"]').value || "";
  const modeli = form.querySelector('select[name="modeli"]').value || "";
  const vitiMin = parseInt(form.querySelector('select[name="vitiMin"]').value) || 1900;
  const vitiMax = parseInt(form.querySelector('select[name="vitiMax"]').value) || 2100;
  const kmMin = parseInt(form.querySelector('select[name="kmMin"]').value) || 0;
  const kmMax = parseInt(form.querySelector('select[name="kmMax"]').value) || 1000000;
  const karburanti = form.querySelector('select[name="karburanti"]').value || "";

  const bodyData = { marka, modeli, vitiMin, vitiMax, kmMin, kmMax, karburanti };

  try {
    const response = await fetch("https://autogmbh-backend.onrender.com/api/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  });


    const results = await response.json();
    const existing = document.querySelector(".car-cards");
    if (existing) existing.remove();

    const resultsContainer = document.createElement("div");
    resultsContainer.className = "car-cards";

    results.forEach((car) => {
      const card = document.createElement("div");
      card.className = "car-card";
      const mainImage = car.foto && car.foto.length > 0 ? car.foto[0] : "default.jpg";

      card.innerHTML = `
        <a href="car-details.html?id=${car._id}">
          <img src="${mainImage}" alt="${car.marka} ${car.modeli}" class="car-image">
          <div class="car-info">
            <h3>${car.marka} ${car.modeli}</h3>
            <p>Viti: ${car.viti}</p>
            <p>Kilometra: ${car.kilometra} km</p>
            <p>Karburanti: ${car.karburanti}</p>
            <p class="price">${car.cmimi} €</p>
          </div>
        </a>
      `;

      card.querySelector("img").addEventListener("click", (e) => {
        e.stopPropagation();
        modal.style.display = "block";
        modalImg.src = mainImage;
      });

      card.addEventListener("click", () => {
        window.location.href = `car-details.html?id=${car._id}`;
      });

      resultsContainer.appendChild(card);
    });

    document.getElementById("results").appendChild(resultsContainer);
  } catch (err) {
    console.error("Gabim gjatë kërkimt:", err);
  }
});

closeModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

// MARKAT, MODELET, VITET, KM
const markaModelData = {
  "BMW": ["1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "6 Series", "7 Series", "8 Series", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "M2", "M3", "M4", "M5", "M6", "Z3", "Z4"],
  "Audi": ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q5", "Q7", "Q8", "TT", "R8", "E-Tron"],
  "Mercedes": ["A-Class", "B-Class", "C-Class", "E-Class", "S-Class", "CLA", "CLS", "GLA", "GLB", "GLC", "GLE", "GLS", "G-Class", "Vito", "V-Class", "EQC"],
  "Volkswagen": ["Golf", "Polo", "Passat", "Tiguan", "Touareg", "Jetta", "Arteon", "Up!", "ID.3", "ID.4", "Sharan", "Touran", "Transporter", "Multivan"],
  "Toyota": ["Yaris", "Auris", "Corolla", "Avensis", "Camry", "RAV4", "C-HR", "Highlander", "Land Cruiser", "Hilux", "Prius", "Supra"],
  "Opel": ["Adam", "Agila", "Astra", "Corsa", "Insignia", "Meriva", "Mokka", "Vectra", "Zafira", "Crossland", "Grandland"],
  "Peugeot": ["106", "206", "207", "208", "306", "307", "308", "406", "407", "508", "2008", "3008", "5008", "RCZ"],
  "Renault": ["Clio", "Twingo", "Megane", "Laguna", "Scenic", "Kadjar", "Koleos", "Talisman", "Captur", "Espace"],
  "Hyundai": ["i10", "i20", "i30", "i40", "Accent", "Elantra", "Tucson", "Santa Fe", "Kona", "Veloster"],
  "Kia": ["Picanto", "Rio", "Ceed", "Cerato", "Sportage", "Sorento", "Stinger", "Niro", "EV6"],
  "Ford": ["Ka", "Fiesta", "Focus", "Fusion", "Mondeo", "C-Max", "S-Max", "Galaxy", "Kuga", "Ranger", "Mustang", "EcoSport"],
  "Skoda": ["Fabia", "Rapid", "Scala", "Octavia", "Superb", "Kamiq", "Karoq", "Kodiaq", "Yeti"],
  "Honda": ["Jazz", "Civic", "Accord", "HR-V", "CR-V", "Prelude", "Insight", "Legend"],
  "Fiat": ["Panda", "Punto", "500", "500L", "500X", "Tipo", "Bravo", "Doblo", "Fiorino", "Freemont"],
  "Nissan": ["Micra", "Note", "Almera", "Juke", "Qashqai", "X-Trail", "Navara", "Pathfinder", "Leaf", "GT-R"],
  "Citroen": ["C1", "C2", "C3", "C3 Aircross", "C4", "C4 Cactus", "C5", "C5 Aircross", "Berlingo", "DS3", "DS4", "DS5"],
  "Mitsubishi": ["Colt", "Lancer", "Outlander", "ASX", "Eclipse Cross", "Pajero", "Space Star"],
  "Mazda": ["2", "3", "5", "6", "CX-3", "CX-5", "CX-30", "MX-5", "RX-8"],
  "Chevrolet": ["Spark", "Aveo", "Cruze", "Captiva", "Orlando", "Malibu", "Trax"],
  "Dacia": ["Logan", "Sandero", "Duster", "Lodgy", "Dokker", "Spring"]
};

const markaDropdown = form.querySelector('select[name="marka"]');
const modeliDropdown = form.querySelector('select[name="modeli"]');
Object.keys(markaModelData).forEach(marka => {
  const option = document.createElement("option");
  option.value = marka;
  option.textContent = marka;
  markaDropdown.appendChild(option);
});

markaDropdown.addEventListener("change", () => {
  const selectedMarka = markaDropdown.value;
  modeliDropdown.innerHTML = '<option value="">Zgjidh Modelin</option>';
  if (markaModelData[selectedMarka]) {
    markaModelData[selectedMarka].forEach(model => {
      const option = document.createElement("option");
      option.value = model;
      option.textContent = model;
      modeliDropdown.appendChild(option);
    });
  }
});

const vitiMinDropdown = form.querySelector('select[name="vitiMin"]');
const vitiMaxDropdown = form.querySelector('select[name="vitiMax"]');
for (let viti = 1999; viti <= 2025; viti++) {
  const optionMin = document.createElement("option");
  optionMin.value = viti;
  optionMin.textContent = viti;
  vitiMinDropdown.appendChild(optionMin);

  const optionMax = document.createElement("option");
  optionMax.value = viti;
  optionMax.textContent = viti;
  vitiMaxDropdown.appendChild(optionMax);
}

const kmMinDropdown = form.querySelector('select[name="kmMin"]');
const kmMaxDropdown = form.querySelector('select[name="kmMax"]');
const kmValues = [0 , 5000, 10000, 20000, 30000, 50000, 70000, 100000, 150000, 200000, 250000, 300000 , 350000 , 400000 , 450000 , 500000];
kmValues.forEach(km => {
  const optionMin = document.createElement("option");
  optionMin.value = km;
  optionMin.textContent = `${km} km`;
  kmMinDropdown.appendChild(optionMin);

  const optionMax = document.createElement("option");
  optionMax.value = km;
  optionMax.textContent = `${km} km`;
  kmMaxDropdown.appendChild(optionMax);
});
