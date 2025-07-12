async function getWeather() {
  const rawCity = document.getElementById("cityInput").value.trim();
  if (!rawCity) return alert("Please enter a city name.");

  const city = encodeURIComponent(rawCity);
  const url = `http://localhost:3000/weather?city=${city}`;


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
