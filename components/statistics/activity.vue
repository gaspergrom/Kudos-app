<template>
    <div class="col-md-6">
        <div class="c-card">
            <h4>Latests Activity</h4>

            <div class="c-feed">
                <div class="c-feed__item c-feed__item--info" v-for="activity of $store.state.activity.activity">
                    <p>{{activity.from.realName || activity.from.name}} sent {{activity.amount}} kudos to {{activity.to.realName || activity.to.name}}</p>
                </div>
            </div><!-- // .c-feed -->

        </div>
    </div>
</template>

<script>
    export default {
        name: "statistics-activity",
        created(){
            this.$store.commit("GET_ACTIVITY");
        }
    }
</script>

<style scoped>

</style>