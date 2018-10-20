<script>

    import {Line, Scatter} from "vue-chartjs";

    export default {
        name: "chart-line",
        extends: Line,
        data() {
            return {
                datacollection: {
                    //Data to be represented on x-axis
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [{
                        label: 'Weight',
                        backgroundColor: 'transparent',
                        pointBackgroundColor: '#1d7bf0',
                        borderWidth: 2,
                        pointBorderColor: '#1d7bf0',
                        borderColor: "#1d7bf0",
                        //Data to be represented on y-axis
                        data: [72, 65, 66, 64, 68, 75, 74, 73, 72, 71, 69, 70]
                    }]
                },
                //Chart.js options that controls the appearance of the chart
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            gridLines: {
                                display: true
                            }
                        }],
                        xAxes: [{
                            gridLines: {
                                display: false
                            }
                        }]
                    },
                    legend: {
                        display: true
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        },
        mounted() {
            //renderChart function renders the chart with the datacollection and options object.
            this.renderChart(this.datacollection, this.options)
        }
    }
</script>

<style scoped>

</style>