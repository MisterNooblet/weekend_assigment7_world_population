import controller from "./controller.js"

const signaller = {
    buttonNames: [],
    countriesPromises: [],
    async fetchContinentData(continent) {
        try {
            let data = await fetch(`https://restcountries.com/v3.1/region/${continent.toLowerCase()}`) // fetching our character using *i* as an id
            if (data.ok === false) {
                throw new Error(data.status)
            } else if (data.ok === true) {
                let object = await data.json()
                this.buttonNames = []
                this.countriesPromises = []
                for (let i = 0; i < object.length; i++) {
                    let response = fetch('https://countriesnow.space/api/v0.1/countries/population', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ "country": `${object[i].name.common}` })
                    })
                    this.countriesPromises.push(response);
                }
                Promise.all(this.countriesPromises).then((values) => {
                    values.forEach(element => {
                        this.processCountry(element.json())
                    })
                });
                this.buttonNames.sort()
                console.log(this.buttonNames);
                controller.updateUi(2)
                console.log(this.buttonNames);
                localStorage.setItem('data', JSON.stringify(object))
            }

        } catch (error) { // if our api call fails for some reason or the link was incorrect we get the following error
            console.log('oooooooooooooooooops', error);
        }


    },

    processCountry(country) {
        country.then(data => {
            if (data.error === false) {
                this.buttonNames.push(data.data.country)
                controller.updateUi(2)
            }
        })
    },

    async fetchCountryData(name) {
        try {
            let data = await fetch('https://countriesnow.space/api/v0.1/countries/population', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "country": `${name}` })
            })
            console.log(data);
            if (data.ok === false) {
                throw new Error(data.status)
            } else if (data.ok === true) {
                let object = await data.json()
                this.buttonNames = []
                localStorage.setItem('data', JSON.stringify(object))
            }
            let citiesOfCurrentCountry = await fetch('https://countriesnow.space/api/v0.1/countries/population/cities/filter', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "limit": 1000,
                    "order": "asc",
                    "orderBy": "name",
                    "country": `${name}`
                })
            })
            let cityNames = await citiesOfCurrentCountry.json()
            let cityNamesArr = cityNames.data
            cityNamesArr.forEach(city => {
                this.buttonNames.push(city.city)
            })
            controller.updateUi(3)
        } catch (error) { // if our api call fails for some reason or the link was incorrect we get the following error
            console.log('oooooooooooooooooops', error);
            controller.updateUi(3)
        }


    },
    async fetchCityData(name) {
        try {
            let data = await fetch('https://countriesnow.space/api/v0.1/countries/population/cities', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "city": `${name}`
                })
            })
            console.log(data);
            if (data.ok === false) {
                throw new Error(data.status)
            } else if (data.ok === true) {
                let object = await data.json()
                localStorage.setItem('citydata', JSON.stringify(object))
            }
            controller.updateUi(3)
        } catch (error) { // if our api call fails for some reason or the link was incorrect we get the following error
            console.log('oooooooooooooooooops', error);
        }


    },
}

export default signaller;