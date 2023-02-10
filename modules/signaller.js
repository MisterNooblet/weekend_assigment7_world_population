import controller from "./controller.js"

const signaller = {
    buttonNames: [],
    countriesPromises: [],
    continentCountries: [],
    async fetchContinentData(continent) {
        controller.buttonControl('disable')
        try {
            let data = await fetch(`https://restcountries.com/v3.1/region/${continent.toLowerCase()}`) // fetching our character using *i* as an id
            if (data.ok === false) {
                // throw new Error(data.status)
            } else if (data.ok === true) {
                let object = await data.json()
                this.buttonNames = []
                this.countriesPromises = []
                this.continentCountries = []
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

                const promises = await Promise.all(this.countriesPromises).then((values) => {
                    values.forEach(element => {
                        this.processCountry(element.json())
                    })
                })
                setTimeout(() => {
                    controller.updateUi(2)
                    controller.buttonControl('enable')
                }, 1)
                // this.buttonNames.sort()

            }

        } catch (error) { // if our api call fails for some reason or the link was incorrect we get the following error
            console.log('oooooooooooooooooops', error);
        }


    },

    processCountry(country) {
        country.then(data => {
            if (data.error === false) {
                let countryName = data.data.country
                let countryCurrentPopulation = data.data.populationCounts.reverse()
                let countryObj = {
                    name: countryName,
                    population: countryCurrentPopulation
                }
                if (this.buttonNames.indexOf(countryName) === -1) {

                    this.buttonNames.push(countryName)
                }
                if (!this.continentCountries.countryObj) {

                    this.continentCountries.push(countryObj)
                }
                this.buttonNames.sort()
                localStorage.setItem('data', JSON.stringify(this.continentCountries))
            }
        })
    },
    async fetchCountryData(name) {
        controller.buttonControl('disable')
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
        controller.buttonControl('enable')

    },
    async fetchCityData(name) {
        controller.buttonControl('disable')
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
            controller.updateUi(4)
        } catch (error) { // if our api call fails for some reason or the link was incorrect we get the following error
            console.log('oooooooooooooooooops', error);
        }

        controller.buttonControl('enable')
    },

}

export default signaller;