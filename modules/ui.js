
import controller from "./controller.js"


const uiControl = {

    makeButtons(array, div) {
        let targetDiv = document.querySelector(`#${div}`)
        array.forEach(element => {
            let btn = document.createElement('button')
            btn.innerHTML = element
            targetDiv.appendChild(btn)
            btn.addEventListener('click', (e) => {
                controller.fetch('continent', e.target.innerHTML)
                console.log(e.target.innerHTML);
            })
        });


    }

}

export default uiControl;