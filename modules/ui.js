
import controller from "./controller.js"
import signaller from "./signaller.js";
//chart related plugins and variables
Chart.defaults.color = 'rgb(255, 166, 0)';
const gradient = window['chartjs-plugin-gradient'];
const plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart, args, options) => {
        const { ctx } = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = options.color || '#99ffff';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
    }
};
Chart.register(gradient);

//uiControl module
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
    applyFlags(array) {
        let buttons = document.querySelectorAll('button')
        buttons.forEach(button => {
            array.forEach(element => {
                if (button.innerHTML === element.name) {
                    button.style.background = `url(${element.flag}) center center/cover`
                    button.classList.add('flag-btn')
                }
            })
        })
    },
    clearButtons() {
        document.querySelector('#lower-buttons').innerHTML = ''
    },
    controlButtons(command) {
        let buttons = document.querySelectorAll('button')
        let chart = document.querySelector('#myChart')
        let spinner = document.querySelector('.circle')
        if (command === 'disable') {
            buttons.forEach(element => {
                element.disabled = true
            })
        } else if (command === 'enable') {
            buttons.forEach(element => {
                element.disabled = false
            })
        }

    },
    destroyChart() {
        if (this.chartExists === true) {
            this.myLineChart.destroy();
        }
        this.chartExists = true
    },
    updateGraph(types) {

        this.destroyChart()
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
            this.myLineChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '2018',
                        data: populations[0],
                        fill: false,
                        backgroundColor: 'rgb(19, 241, 149)',
                        tension: 0.1
                    },
                    {
                        label: '2017',
                        data: populations[1],
                        fill: false,
                        backgroundColor: 'rgb(33, 226, 161)',
                        tension: 0.1
                    },
                    {
                        label: '2016',
                        data: populations[2],
                        fill: false,
                        backgroundColor: 'rgb(83, 161, 201)',
                        tension: 0.1
                    },
                    {
                        label: '2015',
                        data: populations[3],
                        fill: false,
                        backgroundColor: 'rgb(91, 150, 205)',
                        tension: 0.1
                    },
                    {
                        label: '2014',
                        data: populations[4],
                        fill: false,
                        backgroundColor: 'rgb(109, 126, 220)',
                        tension: 0.1
                    },
                    {
                        label: '2013',
                        data: populations[5],
                        fill: false,
                        backgroundColor: 'rgb(120, 110, 229)',
                        tension: 0.1
                    },
                    {
                        label: '2012',
                        data: populations[6],
                        fill: false,
                        backgroundColor: 'rgb(140, 87, 244)',
                        tension: 0.1
                    },
                    {
                        label: '2011',
                        data: populations[7],
                        fill: false,
                        backgroundColor: 'rgb(151, 69, 253)',
                        tension: 0.1
                    },
                    {
                        label: '2010',
                        data: populations[8],
                        fill: false,
                        backgroundColor: 'rgb(105, 48, 176)',
                        tension: 0.1
                    },
                    {
                        label: '2009',
                        data: populations[9],
                        fill: false,
                        backgroundColor: 'rgb(59, 27, 99)',
                        tension: 0.1
                    },]
                },
                options: {
                    plugins: {
                        customCanvasBackgroundColor: {
                            color: 'rgb(90, 90, 90)',
                        }
                    }
                },
                plugins: [plugin],
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

            this.myLineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: data.data.country,
                        data: populations,
                        fill: true,
                        // backgroundColor: 'rgb(19, 241, 149)',
                        tension: 0.5,
                        gradient: {
                            backgroundColor: {
                                axis: 'x',
                                colors: {
                                    0: '#9945FF',
                                    100: '#14F195'
                                }
                            },
                            borderColor: {
                                axis: 'x',
                                colors: {
                                }
                            }
                        }
                    }]
                },
                options: {
                    plugins: {
                        customCanvasBackgroundColor: {
                            color: 'rgb(90, 90, 90)',
                        }
                    }
                },
                plugins: [plugin],
            });
        } else if (types === 'city') {
            const data = JSON.parse(localStorage.getItem('citydata'))
            console.log(data);
            let labels = data.data.populationCounts.reduce((a, b) => {
                a.push(Object.values(b)[0])
                return a
            }, [])
            let populations = []
            data.data.populationCounts.forEach(element => {
                populations.push(element.value)

            })
            this.myLineChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: data.data.city,
                        data: populations,
                        fill: true,
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                        gradient: {
                            backgroundColor: {
                                axis: 'x',
                                colors: {
                                    0: '#9945FF',
                                    100: '#14F195'
                                }
                            },
                            borderColor: {
                                axis: 'x',
                                colors: {
                                }
                            }
                        }
                    }]
                },
                options: {
                    plugins: {
                        customCanvasBackgroundColor: {
                            color: 'rgb(90, 90, 90)',
                        }
                    }
                },
                plugins: [plugin],
            });
        }


    }

}

export default uiControl;