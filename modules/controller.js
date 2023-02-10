import uiControl from "./ui.js"
import signaller from "./signaller.js"
const controller = {

    init() {
        return uiControl.makeButtons(['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'], 'continents-container', 1)
    },
    fetch(type, target) {
        if (type === 'continent') {
            signaller.fetchContinentData(target)
        } else if (type === 'country') {
            signaller.fetchCountryData(target)
        } else if (type === 'city') {
            signaller.fetchCityData(target)
        }
    },
    updateUi(depth) {
        uiControl.clearButtons()
        if (depth === 2) {
            uiControl.updateGraph('continent')
            uiControl.makeButtons(signaller.buttonNames, 'lower-buttons', 2)

        } else if (depth === 3) {
            uiControl.makeButtons(signaller.buttonNames, 'lower-buttons', 3)
            uiControl.updateGraph('country')
        }
    }
}

export default controller;