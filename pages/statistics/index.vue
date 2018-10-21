<template>
    <div class="container">
        <div class="row u-pv-small">
            <div class="col-lg-5 u-text-center u-ml-auto u-mr-auto">
                <h1>Statistics</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="c-tabs">
                    <nav class="c-tabs__list nav nav-tabs" id="myTab" role="tablist">
                        <a class="c-tabs__link" :class="{'active': tabs===0}" @click="tabs=0">Weekly</a>
                        <a class="c-tabs__link" :class="{'active': tabs===1}" @click="tabs=1">Monthly</a>
                        <a class="c-tabs__link" :class="{'active': tabs===2}" @click="tabs=2">Yearly</a>
                    </nav>
                </div>
            </div>
            <statistics-leaderboard :transactions="transactions"></statistics-leaderboard>
            <statistics-departments :transactions="transactions"></statistics-departments>
            <statistics-activity></statistics-activity>
        </div>
    </div>
</template>

<script>
    import StatisticsLeaderboard from "../../components/statistics/leaderboard";
    import StatisticsDepartments from "../../components/statistics/departments";
    import StatisticsActivity from "../../components/statistics/activity";
    export default {
        components: {StatisticsActivity, StatisticsDepartments, StatisticsLeaderboard},
        data: function(){
            return {
                tabs: 0,
                startDate: new Date().getDate()
            }
        },
        watch: {
            tabs: function (val) {
                let startDate=new Date().getTime();
                let today=new Date();
                switch (val){
                    case 0:
                        let day = (today.getDay() + 6) % 7;
                        startDate = new Date(today.getTime() - day * (60000 * 60 * 24)).getDate();
                        break;
                    case 1:
                        startDate = new Date(today.getFullYear(), today.getMonth(), 1).getDate();
                        break;
                    case 2:
                        startDate = new Date(today.getFullYear(), 0, 1).getDate();
                        break;

                }
                this.startDate=startDate;
            }
        },
        computed: {
            transactions: function () {
                return this.$store.state.activity.activity.filter((val)=>{
                    return new Date(val.date).getDate()>=this.startDate;
                })
            }

        },
        created(){
            this.$store.commit("GET_ACTIVITY");
        }
    }
</script>

<style scoped>

</style>