const search = document.getElementById("search");
const temp = document.getElementById("temp");
const ws = document.getElementById("ws");
const hmdty = document.getElementById("hmdty");
const condition = document.getElementById("condition");
const gif = document.getElementById("weatherGif");
const locationBtn = document.getElementById("locationBtn");

async function getWeatherByCity(city) {
  try {
    const res = await fetch(`https://wttr.in/${city}?format=j1`);
    const data = await res.json();

    updateUI(data);
  } catch (err) {
    alert("City not found");
  }
}

async function getWeatherByLocation(lat, lon) {
  try {
    const res = await fetch(`https://wttr.in/${lat},${lon}?format=j1`);
    const data = await res.json();

    updateUI(data);
  } catch (err) {
    alert("Location weather not found");
  }
}

function updateUI(data) {
  const weather = data.current_condition[0];

  temp.innerHTML = `${weather.temp_C}<sup>°</sup>`;
  ws.innerText = weather.windspeedKmph;
  hmdty.innerText = weather.humidity;
  condition.innerText = weather.weatherDesc[0].value;

  setGif(weather.weatherDesc[0].value.toLowerCase());
}

function setGif(desc) {
  if (desc.includes("rain")) {
    gif.src = "images/rain.png";        
  } else if (desc.includes("sun") || desc.includes("clear")) {
    gif.src = "images/sunny.png";     
  } else if (desc.includes("cloud")) {
    gif.src = "images/cloud.png";    
  } else {
    gif.src = "images/default.png";    
  }
}

// 🔍 City search
search.addEventListener("keyup", e => {
  if (e.key === "Enter" && search.value.trim() !== "") {
    getWeatherByCity(search.value.trim());
  }
});

// 📍 Current location
locationBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(
    pos => {
      const { latitude, longitude } = pos.coords;
      getWeatherByLocation(latitude, longitude);
    },
    () => alert("Location access denied")
  );
});

// Default load
getWeatherByCity("Ranchi");
