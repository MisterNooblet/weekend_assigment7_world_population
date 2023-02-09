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
                object.forEach(element => {
                    this.buttonNames.push(element.name.common)
                })
                this.buttonNames.sort()
                console.log(this.buttonNames);
                localStorage.setItem('data', JSON.stringify(object))
            }

        } catch (error) { // if our api call fails for some reason or the link was incorrect we get the following error
            console.log('oooooooooooooooooops', error);
        }


    }

}

export default signaller;