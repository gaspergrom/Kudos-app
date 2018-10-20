<template>
    <div class="container">
        <div class="row u-pv-small">
            <div class="col-lg-5 u-text-center u-ml-auto u-mr-auto">
                <h1>Statistics</h1>
            </div>
        </div>
        <div class="row">

        </div>
    </div>
</template>

<script>
    import StatisticsLeaderboard from "../../components/statistics/leaderboard";
    import StatisticsDepartments from "../../components/statistics/departments";
    import StatisticsTransactions from "../../components/statistics/transactions";
    export default {
        components: {StatisticsTransactions, StatisticsDepartments, StatisticsLeaderboard}
    }
</script>

<style scoped>

</style>