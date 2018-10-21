<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 u-mb-small" v-if="open.length>0">
                <div class="c-table-responsive@wide">
                    <table class="c-table width100" style="display: table">
                        <thead class="c-table__head">
                        <tr class="c-table__row">
                            <th class="c-table__cell c-table__cell--head">User</th>
                            <th class="c-table__cell c-table__cell--head" style="width: 100px">Kudos</th>
                            <th class="c-table__cell c-table__cell--head" style="width: 100px;"></th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr class="c-table__row" v-for="(task, i) in open">
                            <td class="c-table__cell">
                                <div class="o-media">
                                    <div class="o-media__img u-mr-xsmall">
                                        <div class="c-avatar c-avatar--small">
                                            <img class="c-avatar__img" :src="task.assignedBy.imgPaths.image_72"
                                                 v-if="task.assignedBy.realName">
                                            <img class="c-avatar__img" :src="$store.state.user.picture"
                                                 v-else>
                                        </div>
                                    </div>
                                    <div class="o-media__body">
                                        <h6>{{task.assignedBy.realName || task.assignedBy.name}}</h6>
                                        <p>{{task.comment}}</p>
                                    </div>
                                </div>
                            </td>
                            <th class="c-table__cell">{{task.kudosReward}}</th>
                            <td class="c-table__cell">
                                <button class="c-btn c-btn--info" @click="accept(task._id)">Accept</button>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-md-12" v-if="running.length>0">
                <div class="c-table-responsive@wide">
                    <table class="c-table width100" style="display: table">
                        <thead class="c-table__head">
                        <tr class="c-table__row">
                            <th class="c-table__cell c-table__cell--head">User</th>
                            <th class="c-table__cell c-table__cell--head" style="width: 100px">Kudos</th>
                            <th class="c-table__cell c-table__cell--head" style="width: 100px;"></th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr class="c-table__row" v-for="(task, i) in running">
                            <td class="c-table__cell">
                                <div class="o-media">
                                    <div class="o-media__img u-mr-xsmall">
                                        <div class="c-avatar c-avatar--small">
                                            <img class="c-avatar__img" :src="task.assignedBy.imgPaths.image_72"
                                                 v-if="task.assignedBy.realName">
                                            <img class="c-avatar__img" :src="$store.state.user.picture"
                                                 v-else>
                                        </div>
                                    </div>
                                    <div class="o-media__body">
                                        <h6>{{task.assignedBy.realName || task.assignedBy.name}}</h6>
                                        <p>{{task.comment}}</p>
                                    </div>
                                </div>
                            </td>
                            <th class="c-table__cell">{{task.kudosReward}}</th>
                            <td class="c-table__cell">
                                <button class="c-btn c-btn--info" @click="finish(task._id)">Finish</button>
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
            accept: function (id) {
                this.$axios.patch(`/tasks/${id}`, {
                    assignedTo: this.$store.state.auth.userId,
                    assignedDate: new Date().getTime(),
                    state: "running"
                })
                    .then((res) => {
                        this.$store.commit("GET_TASKS");
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            finish: function (id) {
                this.$axios.patch(`/tasks/${id}`, {
                    completedDate: new Date().getTime(),
                    state: "closed"
                })
                    .then((res) => {
                        this.$store.commit("GET_TASKS");
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        },
        computed: {
            open: function () {
                return this.$store.state.tasks.tasks.filter((task) => {
                    return task.stats === "open";
                })
            },
            running: function () {
                return this.$store.state.tasks.tasks.filter((task) => {
                    return task.state === "running";
                })
            },
        },
        created() {
            this.$store.commit("GET_TASKS");
        }
    }
</script>

<style scoped>

</style>