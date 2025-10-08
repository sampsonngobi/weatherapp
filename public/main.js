

const myCity  = document.querySelector('.city')
const temperature  = document.querySelector('.temp')
const feelsLike  = document.querySelector('.feels-like')
const windSpeed  = document.querySelector('.wind-speed')
const humidity  = document.querySelector('.Humidity')

const input = document.querySelector('.input')
const searchButton = document.querySelector('.button')



async function checkWeather(city){
   const response = await fetch(`/api/weather?city=${city}`);
    var data = await response.json();

    if(response.status == 404){
        document.querySelector('.error').style.display = 'block'
        document.querySelector('.weather').style.display = 'none';

    }else{
        myCity.innerHTML = data.name;
        temperature.innerHTML = Math.round(data.main.temp) + "°C";
        feelsLike.innerHTML = "feels like" +" "+ Math.round(data.main.feels_like)+ "°C";
        windSpeed.innerHTML = data.wind.speed +" "+"km/h";
        humidity.innerHTML = data.main.humidity+"%";

        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.error').style.display = 'none'
    }
}

searchButton.addEventListener("click", ()=>{
    checkWeather(input.value)

    clearInput()
    
})

function clearInput(){
    input.value = '';
}
