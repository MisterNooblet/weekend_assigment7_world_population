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
        }
    },
    updateUi() {
        uiControl.clearButtons()
        uiControl.makeButtons(signaller.buttonNames, 'lower-buttons', 2)
    }
}

export default controller;