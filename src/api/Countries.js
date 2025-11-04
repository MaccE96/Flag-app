// src/api/Countries.js

export async function getAllCountries() {
  const url = "https://restcountries.com/v3.1/all?fields=flags,name,capital,population,region";
  console.log("🔍 Hämtar länder från:", url);

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Fel vid API-anrop: ${res.status}`);
    }

    const data = await res.json();
    console.log("✅ Länder hämtade:", data.length);
    console.log(data);
    return data;
  } catch (error) {
    console.error("❌ Fel vid hämtning av länder:", error);
    throw error;
  }
}
