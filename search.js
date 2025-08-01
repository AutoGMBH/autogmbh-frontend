async function fetchAndDisplayCars() {
  try {
    const response = await fetch("https://autogmbh-backend.onrender.com/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}) // kërkesë pa filtra
    });

    if (!response.ok) {
      throw new Error("Kërkesa dështoi me status: " + response.status);
    }

    const results = await response.json();

    const existing = document.querySelector(".car-cards");
    if (existing) existing.remove();

    const resultsContainer = document.createElement("div");
    resultsContainer.className = "car-cards";

    if (results.length === 0) {
      resultsContainer.innerHTML = "<p style='color:white;'>Asnjë veturë nuk u gjet.</p>";
    }

    results.forEach((car) => {
      const card = document.createElement("div");
      card.className = "car-card";
      const mainImage = car.foto && car.foto.length > 0 ? car.foto[0] : "default.jpg";

      // Krijo përmbajtjen e kartelës me link direkt
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

      resultsContainer.appendChild(card);
    });

    document.getElementById("results").appendChild(resultsContainer);

  } catch (err) {
    console.error("❌ Gabim gjatë ngarkimit të veturave:", err);
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "<p style='color:red;'>Gabim gjatë marrjes së të dhënave.</p>";
  }
}

// Thirr funksionin direkt kur faqja ngarkohet
window.addEventListener("DOMContentLoaded", fetchAndDisplayCars);
