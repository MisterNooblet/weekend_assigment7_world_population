api request sequence and commands

https://restcountries.com/#api-endpoints-v2-continent

https://restcountries.com/v3.1/region/europe


fetch('https://restcountries.com/v3.1/region/europe', {
     method: 'GET',
     headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
     }
 })
 .then(response => response.json())
 .then(response => console.log(JSON.stringify(response)))

fetch('https://restcountries.com/v3.1/region/africa', {
     method: 'GET',
     headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
     }
 })
 .then(response => response.json())
 .then(response => console.log(JSON.stringify(response)))

fetch('https://restcountries.com/v3.1/region/asia', {
     method: 'GET',
     headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
     }
 })
 .then(response => response.json())
 .then(response => console.log(JSON.stringify(response)))

fetch('https://restcountries.com/v3.1/region/americas', {
     method: 'GET',
     headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
     }
 })
 .then(response => response.json())
 .then(response => console.log(JSON.stringify(response)))


fetch('https://restcountries.com/v3.1/region/oceania', {
     method: 'GET',
     headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
     }
 })
 .then(response => response.json())
 .then(response => console.log(JSON.stringify(response)))

!!!!!!!postman:!!!!!!!!

get country :

fetch('https://countriesnow.space/api/v0.1/countries/population', {
     method: 'POST',
     headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
     },
     body: JSON.stringify({ "country": "nigeria" })
 })
 .then(response => response.json())
 .then(response => console.log(JSON.stringify(response)))






get all cities of a country // will get us only cities with population data.. :

 fetch('https://countriesnow.space/api/v0.1/countries/population/cities/filter', {
     method: 'POST',
     headers: {
        'Accept': 'application/json',
         'Content-Type': 'application/json'
     },
    body: JSON.stringify({
     	"limit": 1000,
	    "order": "asc",
	    "orderBy": "name",
	    "country": "nigeria" 
     })
 })
 .then(response => response.json())
 .then(response => console.log(JSON.stringify(response)))



//get info about a specific city


  fetch('https://countriesnow.space/api/v0.1/countries/population/cities', {
     method: 'POST',
     headers: {
        'Accept': 'application/json',
         'Content-Type': 'application/json'
     },
    body: JSON.stringify({
        "city": "Akure"
     })
 })
 .then(response => response.json())
 .then(response => console.log(JSON.stringify(response)))