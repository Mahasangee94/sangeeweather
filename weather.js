"use strict";
const api="91257106ba6bd82830652963652dbc0c";

const dayE1=document.querySelector(".default_day");
const dateE1=document.querySelector(".default_date");
const btnE1=document.querySelector(".search");
const input=document.querySelector(".input_field");

const icon=document.querySelector(".icons");
const dayinfo=document.querySelector(".overall");
const list=document.querySelector(".list");

const days=[
    "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];

    const day= new Date();
    const dayName= days[day.getDay()];
    dayE1.textContent = dayName;

    let month=day.toLocaleString("default", {month:"long"});
    let date= day.getDate();
    let year= day.getFullYear();

    console.log();
    dateE1.textContent = date + " " + month+ " " + year;
    btnE1.addEventListener("click",(e)=>{
        e.preventDefault();

        if(input.value !==""){
            const Search = input.value;
            input.value="";
            findLocation(Search);
        } else{
            console.log("Please enter city name");
        }
    })
    async function findLocation(name){
        icon.innerHTML= "";
        dayinfo.innerHTML= "";
        list.innerHTML= "";
        try{
            const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${api}`;
            const data = await fetch(apiUrl);
            const result = await data.json();
            console.log(result);
    if (result.cod !=="404"){
        const Image=displayImage(result);
        const Side= Sidecontent(result);
        displayforecast(result.coord.lat, result.coord.lon);
        setTimeout(() => {
        icon.insertAdjacentHTML("afterbegin", Image);
        icon.classList.add("fadeIn");
        dayinfo.insertAdjacentHTML("afterbegin", Side);
        }, 1500);
    }else{
        const message=`<h2 class="temp">${result.cod}</h2>
        <h3 class="cloud">${result.message}</h3>`;
        icon.insertAdjacentHTML("afterbegin", message);
    }
        } catch(error){}
}
function displayImage(data){
    return  `<img src="https://openweathermap.org/img/wn/${
        data.weather[0].icon}@4x.png" alt=""/>
        <h2 class="temp">${Math.round(data.main.temp - 275.15)}°C</h2>
        <h3 class="cloud">${data.weather[0].description}</h3>`;
}

function Sidecontent(result){
    return ` <div class="content">
    <p class="title">Name</p>
    <span class="value">${result.name}</span>
</div>
<div class="content">
            <p class="title">Temp</p>
            <span class="value">${Math.round(result.main.temp - 275.15)}</span>
        </div>
        <div class="content">
        <p class="title">Humidity</p>
        <span class="value">${result.main.humidity}</span>
            </div>
            <div class="content">
            <p class="title">Wind Speed</p>
            <span class="value">${result.wind.speed}</span>
        </div>`;
}

async function displayforecast(lat,long){
const forecast= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}`;
const data =await fetch(forecast);
const result = await data.json();
const forecastdays=[];
const foreday=result.list.filter((forecast) =>{
    const forecastDate= new Date(forecast.dt_txt).getdata();
    if (!forecastdays.includes(forecastDate)){
        return forecastdays.push(forecastDate);
    }
});
console.log(foreday);
foreday.forEach((content, indx)=>{
    if(indx <= 3){
        list.insertAdjacentHTML("afterbegin", forecast(content));
    }
});
}

function forecast(frContent){
    const day= new Date(frContent.dt_txt);
    const dayName=days[day.getday()];
    const splitDay= dayName.split("", 3);
    const joinDay = splitDay.join("");
console.log(dayName);
return `<li>
    <img src="https://openweathermap.org/img/wn/${
        frContent.weather[0].icon
    }@2x.png"/>
        <span>${joinDay}</span>
        <span class="temp1">${Math.round(frContent.main.temp - 275.15)}°C<</span></li>`;
}
  
    