import controller from "./controller.js"

const signaller = {
    buttonNames: [],
    async fetchContinentData(continent) {
        try {
            let data = await fetch(`https://restcountries.com/v3.1/region/${continent.toLowerCase()}`) // fetching our character using *i* as an id
            if (data.ok === false) {
                throw new Error(data.status)
            } else if (data.ok === true) {
                let object = await data.json()
                this.buttonNames = []
                object.forEach(element => {
                    this.checkIfCountriesHaveData(element.name.common)
                })
                this.buttonNames.sort()
                this.checkIfCountriesHaveData()
                console.log(this.buttonNames);
                controller.updateUi()
                console.log(this.buttonNames);
                localStorage.setItem('data', JSON.stringify(object))
            }

        } catch (error) { // if our api call fails for some reason or the link was incorrect we get the following error
            console.log('oooooooooooooooooops', error);
        }


    },

    async checkIfCountriesHaveData(name) {
        let response = await fetch('https://countriesnow.space/api/v0.1/countries/population', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "country": `${name}` })
        })
        if (response.ok === true) {
            this.buttonNames.push(name)
        }
        controller.updateUi()
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
                // object.forEach(element => {
                //     this.buttonNames.push(element.name.common)
                // })
                // this.buttonNames.sort()
                // controller.updateUi()
                // console.log(this.buttonNames);
                localStorage.setItem('data', JSON.stringify(object))
            }

        } catch (error) { // if our api call fails for some reason or the link was incorrect we get the following error
            console.log('oooooooooooooooooops', error);
        }


    },
}

export default signaller;