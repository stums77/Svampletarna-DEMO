// Hämtar elementet där svamparna ska visas
const differenceList = document.getElementById("differenceList");

// Hämtar information från JSON-filen
async function showMushrooms() {
  try {
    const response = await fetch("../data/speciellaEgenskaper.json");
    const mushroomData = await response.json();

    // Går igenom alla svampjämförelser
    mushroomData.särskiljande_egenskaper.forEach(mushroom => {

      // Gör en lista av de särskiljande egenskaperna
      const differences = mushroom.särskiljande
        .map(difference => `<li>${difference}</li>`)
        .join("");

      // Visar svampparet, risken och skillnaderna. Gör också informationen klickbar
      differenceList.innerHTML += `
        <details>
          <summary>${mushroom.par}</summary>
          <p><strong>Risk:</strong> ${mushroom.risk}</p>
          <ul>${differences}</ul>
        </details>
      `;
    });

  } catch (error) {
    // Visar ett felmeddelande om filen inte kan hämtas
    console.error("Kunde inte hämta svamparna:", error);
  }
}

// Kör funktionen endast på förväxlingssidan
if (differenceList) {
showMushrooms();
}
