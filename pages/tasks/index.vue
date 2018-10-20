<template>
    <div class="container">
        <div class="row">
            <div class="col-12" v-if="notAccepted.length>0">
                <div class="c-table-responsive@wide">
                    <table class="c-table width100">
                        <thead class="c-table__head">
                        <tr class="c-table__row">
                            <th class="c-table__cell c-table__cell--head">User</th>
                            <th class="c-table__cell c-table__cell--head" style="width: 100px">Kudos</th>
                            <th class="c-table__cell c-table__cell--head" style="width: 100px;"></th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr class="c-table__row" v-for="(task, i) in notAccepted">
                            <td class="c-table__cell">
                                <div class="o-media">
                                    <div class="o-media__img u-mr-xsmall">
                                        <div class="c-avatar c-avatar--small">
                                            <img class="c-avatar__img" src="http://via.placeholder.com/72"
                                                 alt="Jessica Alba">
                                        </div>
                                    </div>
                                    <div class="o-media__body">
                                        <h6>{{task.name}}</h6>
                                        <p>{{task.message}}</p>
                                    </div>
                                </div>
                            </td>
                            <th class="c-table__cell">{{task.kudos}}</th>
                            <td class="c-table__cell">
                                <button class="c-btn c-btn--info" @click="accept(i)">Accept</button>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-12" v-if="notFinished.length>0">
                <div class="c-table-responsive@wide">
                    <table class="c-table width100">
                        <thead class="c-table__head">
                        <tr class="c-table__row">
                            <th class="c-table__cell c-table__cell--head">User</th>
                            <th class="c-table__cell c-table__cell--head" style="width: 100px">Kudos</th>
                            <th class="c-table__cell c-table__cell--head" style="width: 100px;"></th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr class="c-table__row" v-for="(task, i) in notFinished">
                            <td class="c-table__cell">
                                <div class="o-media">
                                    <div class="o-media__img u-mr-xsmall">
                                        <div class="c-avatar c-avatar--small">
                                            <img class="c-avatar__img" src="http://via.placeholder.com/72"
                                                 alt="Jessica Alba">
                                        </div>
                                    </div>
                                    <div class="o-media__body">
                                        <h6>{{task.name}}</h6>
                                        <p>{{task.message}}</p>
                                    </div>
                                </div>
                            </td>
                            <th class="c-table__cell">{{task.kudos}}</th>
                            <td class="c-table__cell">
                                <button class="c-btn c-btn--info" @click="finish(i)">Finish</button>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        methods: {
            accept: function (i) {
                this.$store.state.tasks.tasks[i].accepted = true;
                //todo send request that this shit is accepted
            },
            finish: function (i) {
                this.$store.state.tasks.tasks[i].accepted = true;
            }
        },
        computed: {
            notAccepted: function () {
                return this.$store.state.tasks.tasks.filter((task) => {
                    return !task.accepted && !task.finished
                })
            },
            notFinished: function () {
                return this.$store.state.tasks.tasks.filter((task) => {
                    return task.accepted && !task.finished
                })
            }
        },
        created(){
            this.$store.commit("GET_TASKS");
        }
    }
</script>

<style scoped>

</style>