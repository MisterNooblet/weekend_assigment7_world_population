
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
            let labels = data.reduce((a, b) => {
                a.push(Object.values(b)[0])
                return a
            }, [])
            let populations = [[], [], [], [], [], [], [], [], [], []]
            data.forEach(element => {
                for (let i = 0; i < 10; i++) {
                    populations[i].push(element.population[i].value)
                }
            })
            if (this.chartExists === true) {
                this.myLineChart.destroy();
            }
            this.chartExists = true
            this.myLineChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '2018',
                        data: populations[0],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    },
                    {
                        label: '2017',
                        data: populations[1],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    },
                    {
                        label: '2016',
                        data: populations[2],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    },
                    {
                        label: '2015',
                        data: populations[3],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    },
                    {
                        label: '2014',
                        data: populations[4],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    },
                    {
                        label: '2013',
                        data: populations[5],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    },
                    {
                        label: '2012',
                        data: populations[6],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    },
                    {
                        label: '2011',
                        data: populations[7],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    },
                    {
                        label: '2010',
                        data: populations[8],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    },
                    {
                        label: '2009',
                        data: populations[9],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    },]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        } else if (types === 'country') {
            const data = JSON.parse(localStorage.getItem('data'))
            console.log(data);
            let labels = data.data.populationCounts.reduce((a, b) => {
                a.push(Object.values(b)[0])
                return a
            }, [])
            let populations = []
            data.data.populationCounts.forEach(element => {
                populations.push(element.value)

            })
            if (this.chartExists === true) {
                this.myLineChart.destroy();
            }
            this.chartExists = true
            this.myLineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: data.data.country,
                        data: populations,
                        fill: true,
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