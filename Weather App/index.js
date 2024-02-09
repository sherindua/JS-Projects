
let target='New Delhi';
fetchData(target);

const formEle=document.querySelector('form');
const tempEle=document.querySelector('.temp');
const locationEle=document.querySelector('.time_location p');
const timeEle=document.querySelector('.time_location span');
const conditionEmojiEle=document.querySelector('.condition img');
const conditionEle=document.querySelector('.condition span');
const searchFieldEle=document.querySelector('.searchField');


async function fetchData(target){
try{
let url=`https://api.weatherapi.com/v1/current.json?key=7d258fab4a1049029ab55553242201&q=${target}&aqi=no`;

let response=await fetch(url);
console.log(response);
const data=await response.json();
console.log(data);

let currentTemp=data.current.temp_c;
let condition=data.current.condition.text;
let locationName=data.location.name+", "+data.location.country;
let localTime=data.location.localtime;
let conditionEmoji=data.current.condition.icon;

displayUI(currentTemp, condition, locationName, localTime, conditionEmoji);

}
catch(error){
  console.log(error);
}
}



formEle.addEventListener('submit', search);

function search(e){
  e.preventDefault();
  target=searchFieldEle.value;
  fetchData(target);
};

function displayUI(currentTemp, condition, locationName, localTime, conditionEmoji){
tempEle.innerText=currentTemp;
locationEle.innerText=locationName;
timeEle.innerText=localTime;
conditionEle.innerText=condition;
conditionEmojiEle.src=conditionEmoji;

}

function setTemp(){

}
