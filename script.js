// script.js
const apiKey = "4c128273085e5d5c45e9b09d48ee43a6"; // Your OpenWeather API key

async function getWeather() {
  const rawCity = document.getElementById("cityInput").value.trim();
  if (!rawCity) return alert("Please enter a city name.");

  const city = encodeURIComponent(rawCity);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      alert("City not found. Please try again.");
      return;
    }

    const weatherType = data.weather[0].main.toLowerCase();
    const iconMap = {
      clear: "clear.png",
      clouds: "clouds.png",
      rain: "rain.png",
      drizzle: "drizzle.png",
      snow: "snow.png",
      mist: "mist.png"
    };

    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temperature").textContent = `${data.main.temp} °C`;
    document.getElementById("humidity").textContent = `${data.main.humidity} %`;
    document.getElementById("wind").textContent = `${data.wind.speed} km/h`;
    document.getElementById("weatherIcon").src = `images/${iconMap[weatherType] || "clear.png"}`;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("An error occurred while fetching weather data.");
  }
}

// Optional: handle Enter key press
document.getElementById("cityInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});
