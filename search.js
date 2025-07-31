const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.querySelector(".close-modal");

async function fetchAndDisplayCars() {
  try {
    const response = await fetch("https://autogmbh-backend.onrender.com/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}) // kërkesë pa filtra
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
    console.error("Gabim gjatë ngarkimit të veturave:", err);
  }
}

// Thirr funksionin direkt kur faqja ngarkohet
window.addEventListener("DOMContentLoaded", fetchAndDisplayCars);

// Modal kontroll
closeModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};
