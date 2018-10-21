<template>
    <div class="col-xl-6">
        <div class="c-card" data-mh="overview-cards">
            <h4>Customers</h4>
            <p class="u-mb-medium">Lorem ipsum dolor sit amet, consectetur.</p>

            <div class="c-chart">
                <div class="c-chart__body">

                    <!-- Chartist.js uses this class to generate the chart -->
                    <div class="pie-chart"></div>
                </div>

                <div class="c-chart__legends">
                    <div class="row">
                        <div class="col-6">
                        <span class="c-chart__legend">
                          <i class="c-chart__legend-icon u-bg-info"></i>New Customer
                        </span>
                        </div>

                        <div class="col-6">
                        <span class="c-chart__legend">
                          <i class="c-chart__legend-icon u-bg-pink"></i>Old Customers
                        </span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                        <span class="c-chart__legend">
                          <i class="c-chart__legend-icon u-bg-fancy"></i>Avg. Customers
                        </span>
                        </div>

                        <div class="col-6">
                        <span class="c-chart__legend">
                          <i class="c-chart__legend-icon u-bg-success"></i>Hi Customers
                        </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "statistics-departments"
    }
</script>

<style scoped>

</style>