
import controller from "./controller.js"
import signaller from "./signaller.js";


const uiControl = {
    chartExists: false,
    myLineChart: null,
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
    },
    updateGraph(types) {


        const ctx = document.getElementById('myChart');
        if (types === 'continent') {
            const data = JSON.parse(localStorage.getItem('data'))
            console.log(data);
            let labels = data.reduce((a, b) => {
                a.push(Object.values(b)[0])
                return a
            }, [])
            let populations = data.reduce((a, b) => {
                a.push(b.population.value)
                return a
            }, [])
            if (this.chartExists === true) {
                this.myLineChart.destroy();
            }
            this.chartExists = true
            this.myLineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '2018',
                        data: populations,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }


    }

}

export default uiControl;