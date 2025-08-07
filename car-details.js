document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const carId = params.get("id");

  if (!carId) return;

  try {
    const response = await fetch(`https://autogmbh-backend.onrender.com/api/search/${carId}`);
    const data = await response.json();

    // Fotot
    if (data.foto && data.foto.length > 0) {
      document.getElementById("mainPhoto").src = data.foto[0];
      const thumbnails = document.getElementById("thumbnailContainer");

      data.foto.forEach((url, index) => {
        const thumb = document.createElement("img");
        thumb.src = url;
        thumb.alt = `Foto ${index + 1}`;
        thumb.addEventListener("click", () => {
          document.getElementById("mainPhoto").src = url;
        });
        thumbnails.appendChild(thumb);
      });
    }

    // Tekstet
    document.getElementById("carTitle").textContent = `${data.marka} ${data.modeli}`;
    document.getElementById("viti").textContent = data.viti;
    document.getElementById("kilometra").textContent = data.kilometra;
    document.getElementById("karburanti").textContent = data.karburanti;
    document.getElementById("motorri").textContent = data.motorri || "—";
    document.getElementById("transmisioni").textContent = data.transmisioni || "—";
    document.getElementById("description").textContent = data.description || "—";

    // Statusi & Çmimi
    const priceBox = document.querySelector(".price-box p span");
    if (data.statusi === "sold") {
      priceBox.textContent = "Verkauft";
      priceBox.style.color = "red";
    } else {
      priceBox.textContent = `${data.cmimi} CHF`;
    }

  } catch (error) {
    console.error("Fehler beim Laden der Fahrzeugdaten:", error);
  }
});
