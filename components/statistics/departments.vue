<template>
    <div class="col-md-6">
        <div class="c-card" data-mh="overview-cards">
            <h4>Departments</h4>
            <p class="u-mb-medium"></p>

            <div class="c-chart">
                <div class="c-chart__body">
                    <chart-pie :values="depart"></chart-pie>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ChartPie from "../charts/pie";
    export default {
        name: "statistics-departments",
        props: ["transactions"],
        computed: {
            depart:function () {
                let users={};
                for(let i=0; i<this.transactions.length; i++){
                    if(this.transactions[i].to._id in users){
                        users[this.transactions[i].to._id]["amount"]+=this.transactions[i].amount;
                    }
                    else{
                        users[this.transactions[i].to._id]={
                            amount: this.transactions[i].amount,
                            user: this.transactions[i].to
                        }
                    }
                }
                return this.$store.state.companies.departments.map((val) => {
                    return val.members.reduce((a, b) => {
                        return (users[a._id]?users[a._id].amount:0)+ (users[b._id]?users[b._id].amount:0);
                    });
                });
            }
        },
        components: {ChartPie}
    }
</script>

<style scoped>

</style>