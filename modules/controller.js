import uiControl from "./ui.js"
import signaller from "./signaller.js"
const controller = {

    init() {
        return uiControl.makeButtons(['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'], 'continents-container')
    },
    fetch(type, target) {
        if (type === 'continent') {
            signaller.fetchContinentData(target)
        }
    }
}

export default controller;