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
                controller.updateUi()
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
                controller.updateUi()
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

        } catch (error) { // if our api call fails for some reason or the link was incorrect we get the following error
            console.log('oooooooooooooooooops', error);
        }


    },
}

export default signaller;