<template>
    <div class="container">
        <div class="row flex--center">

            <div class="col-md-5 flex--one">
                <div class="c-card height100 width100">
                    <div class="u-text-center">
                        <div class="c-avatar c-avatar--large u-mb-small u-inline-flex">
                            <img class="c-avatar__img" v-if="user.imgPaths" :src="user.imgPaths.image_192" alt="Avatar">
                        </div>

                        <h5>{{user.realName || user.name }}</h5>
                    </div>

                    <span class="c-divider u-mv-small"></span>

                    <span class="c-text--subtitle text-center width100 block">Kudos received from you</span>
                    <p class="u-mb-small u-text-large text-center">{{sentKudos}}</p>

                    <span class="c-text--subtitle text-center width100 block">Kudos sent to you</span>
                    <p class="u-mb-small u-text-large text-center">{{receivedKudos}}</p>
                </div>
            </div>
            <div class="col-md-7 flex--one">
                <nav class="c-tabs height100 width100">
                    <div class="c-tabs__list nav nav-tabs" id="myTab" role="tablist">
                        <div class="c-tabs__link" :class="{'active': tabs===0}" @click="tabs=0">Activity</div>
                        <div class="c-tabs__link" :class="{'active': tabs===1}" @click="tabs=1">Received</div>
                        <div class="c-tabs__link" :class="{'active': tabs===2}" @click="tabs=2">Sent</div>
                    </div>
                    <div class="c-tabs__content tab-content">
                        <div class="c-tabs__pane height100" :class="{'active': tabs===0}">
                            <div class="c-feed">
                                <div class="c-feed__item c-feed__item--info" v-for="activity of filterActivity">
                                    <p>{{activity.from.realName || activity.from.name}} sent {{activity.amount}} kudos to {{activity.to.realName || activity.to.name}}</p>
                                </div>
                            </div><!-- // .c-feed -->
                        </div>
                        <div class="c-tabs__pane height100" :class="{'active': tabs===1}">
                            <template v-for="from of received">
                                <p class="u-mb-xsmall">{{from.user.realName || from.user.name}} ({{from.amount}})</p>
                                <div class="c-progress c-progress--warning c-progress--medium u-mb-small">
                                    <div class="c-progress__bar" :style="{'width':`${from.amount/received[0].amount*100}%`}"></div>
                                </div>
                            </template>
                        </div>
                        <div class="c-tabs__pane height100" :class="{'active': tabs===2}">
                            <template v-for="to of sent">
                                <p class="u-mb-xsmall">{{to.user.realName || to.user.name}} ({{to.amount}})</p>
                                <div class="c-progress c-progress--warning c-progress--medium u-mb-small">
                                    <div class="c-progress__bar" :style="{'width':`${to.amount/sent[0].amount*100}%`}"></div>
                                </div>
                            </template>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                tabs: 0,
                id: null,
                user: {},
                activity: []
            }
        },
        watch: {
            '$route'(to, from) {
                this.id = this.$route.params.id;
            }
        },
        computed: {
            filterActivity: function () {
                return this.$store.state.activity.activity.filter((val) => {
                    return (val.from._id===this.$store.state.auth.userId && val.to._id===this.id) || (val.to._id===this.$store.state.auth.userId && val.from._id===this.id);
                })
            },
            receivedKudos: function () {
                let sum=0;
                for(let i=0; i<this.filterActivity.length; i++){
                    if(this.filterActivity[i].to._id===this.$store.state.auth.userId){
                        sum+=this.filterActivity[i].amount
                    }
                }
                return sum;
            },
            sentKudos: function () {
                let sum=0;
                for(let i=0; i<this.filterActivity.length; i++){
                    if(this.filterActivity[i].from._id===this.$store.state.auth.userId){
                        sum+=this.filterActivity[i].amount
                    }
                }
                return sum;
            },
            received: function () {
                let arr= this.$store.state.activity.activity.filter((val) => {
                    return val.to._id===this.id;
                });
                let users={};
                for(let i=0; i<arr.length; i++){
                    if(arr[i].from._id in users){
                        users[arr[i].from._id].amount+=arr[i].amount;
                    }
                    else{
                        users[arr[i].from._id]={
                            amount: arr[i].amount,
                            user: arr[i].from
                        }
                    }
                }
                let fin=Object.values(users);//.sort((a,b) => (a.amount > b.amount) ? 1 : ((b.amount > a.amount) ? -1 : 0))
                return fin.splice(0, 5)
            },
            sent: function () {
                let arr= this.$store.state.activity.activity.filter((val) => {
                    return val.from._id===this.id;
                });
                let users={};
                for(let i=0; i<arr.length; i++){
                    if(arr[i].to._id in users){
                        users[arr[i].to._id].amount+=arr[i].amount;
                    }
                    else{
                        users[arr[i].to._id]={
                            amount: arr[i].amount,
                            user: arr[i].to
                        }
                    }
                }
                let fin=Object.values(users);//.sort((a,b) => (a.amount > b.amount) ? 1 : ((b.amount > a.amount) ? -1 : 0));
                return fin.splice(0, 5)
            }
        },
        created() {
            this.$store.commit("GET_ACTIVITY");
            this.id = this.$route.params.id;
            if (this.id === this.$store.state.auth.userId) {
                this.$router.push("/user")
            }
            this.$axios.get(`/employees/${this.id}`)
                .then((res) => {
                    this.user = res.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    }
</script>

<style scoped>

</style>