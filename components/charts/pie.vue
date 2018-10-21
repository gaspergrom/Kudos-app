<script>

    import {Doughnut} from "vue-chartjs";

    export default {
        name: "chart-pie",
        props: ["values"],
        extends: Doughnut,
        data() {
            return {
                datacollection: {
                    //Data to be represented on x-axis
                    labels: this.$store.state.companies.departments.map((val) => val.title),
                    datasets: [{
                        data: this.values,
                        backgroundColor: [...this.getRandomColors(this.$store.state.companies.departments.length)]
                    }]
                },
                //Chart.js options that controls the appearance of the chart
                options: {
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display: false
                            }
                        }]
                    },
                    legend: {
                        display: false
                    },
                    responsive: true,
                }
            }
        },
        watch: {
            values: function (val) {
                this.renderChart(this.datacollection, this.options);
            }
        },
        mounted() {
            this.renderChart(this.datacollection, this.options);
            this.$store.state.activity.activity.forEach((item)=>{
                console.log(item);
            })
        },
        methods: {
            getRandomColors(rep) {
                let colors= [];
                for(let i=0; i<rep; i++){
                    let letters = '0123456789ABCDEF';
                    let color = '#';
                    for (let i = 0; i < 6; i++) {
                        color += letters[Math.floor(Math.random() * 16)];
                    }
                    colors.push(color);
                }
                return colors;
            }
        }
    }
</script>

<style scoped>

</style>