<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                {{$store.state.activity.activity}}
                <div class="c-card" data-mh="dashboard3-cards">
                    <h4 v-if="$store.state.activity.activity.length>0">Activity</h4>
                    <h4 v-else>No activity</h4>
                    <br>
                    <div class="o-line u-pb-small u-mb-small u-border-bottom"
                         v-for="activity in $store.state.activity.activity">
                        <div class="o-media">
                            <div class="o-media__img u-mr-small">
                                <div class="c-avatar c-avatar--xsmall">
                                    <img class="c-avatar__img" :src="activity.profileImg" alt="Name">
                                </div>
                            </div>

                            <div class="o-media__body">
                                <h6>{{activity.firstName}} {{activity.lastName}}</h6>
                                <p>{{activity.comment}}</p>
                            </div>
                        </div>

                        <h6>{{activity.amount}} kudos
                            <span class="u-color-success u-block" v-if="activity.to===$store.state.auth.userId">
                      <i class="feather icon-trending-up"></i>
                    </span>
                            <span class="u-color-danger u-block" v-else>
                      <i class="feather icon-trending-down"></i>
                    </span>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        created(){
            this.$store.commit("GET_ACTIVITY");
        }
    }
</script>

<style scoped>

</style>