
import controller from "./controller.js"


const uiControl = {

    makeButtons(array, div, api) {
        let targetDiv = document.querySelector(`#${div}`)
        array.forEach(element => {
            let btn = document.createElement('button')
            btn.innerHTML = element
            targetDiv.appendChild(btn)
            switch (api) {
                case 1:
                    btn.addEventListener('click', (e) => {
                        controller.fetch('continent', e.target.innerHTML)
                        console.log(e.target.innerHTML);
                    })
                    break;
                case 2:
                    btn.addEventListener('click', (e) => {
                        controller.fetch('country', e.target.innerHTML)
                        console.log(e.target.innerHTML);
                    })
                    break;
                case 3:
                    btn.addEventListener('click', (e) => {
                        controller.fetch('city', e.target.innerHTML)
                        console.log(e.target.innerHTML);
                    })
                    break;
                default:
                    break;
            }

        });


    },
    clearButtons() {
        document.querySelector('#lower-buttons').innerHTML = ''
    }

}

export default uiControl;