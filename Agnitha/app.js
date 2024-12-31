
const apiKey = '26bd67fc32a13ce10b8d55790497a609';


const form = document.querySelector('form');
const cityInput = document.getElementById('city');
const weatherCard = document.querySelector('.weather-card');
const cityName = document.getElementById('city-name');
const temp = document.getElementById('temp');
const feelsLike = document.getElementById('feels-like');
const weatherIcon = document.querySelector('.icon i');


form.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const city = cityInput.value.trim(); 
    if (!city) {
        alert('Please enter a city name!');
        return;
    }

    try {
        
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error('City not found!');
        }

        const data = await response.json();

        
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temp.textContent = `${data.main.temp}°C`;
        feelsLike.textContent = `Feels like: ${data.main.feels_like}°C`;

        
        const iconCode = data.weather[0].icon; 
        weatherIcon.className = ''; 
        weatherIcon.classList.add('fas', `wi-${iconCode}`);

        
        weatherCard.style.display = 'block';

    } catch (error) {
        alert(error.message);
    }
});
