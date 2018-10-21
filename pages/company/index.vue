<template>
    <div class="container">
        <div class="row pb20" v-if="$store.state.companies.employees.length>0">
            <div class="col-md-12">
                <div class="c-field">
                    <input class="c-input" id="input1" type="search" v-model="search" placeholder="Search...">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12" v-if="$store.state.auth.teamId==null">
                <h2 class="text-center pb20">Cannot get members! please connect app to your workspace
                </h2>
                <div class="flex flex--center">
                    <a href="https://slack.com/oauth/authorize?scope=commands users:read team:read&client_id=373180051559.455945801345&redirect_uri=http://localhost:3000/slack&state=workspace"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
                </div>
            </div>
            <div class="col-md-12" v-if="$store.state.companies.employees.length===0">
                <h2 class="text-center pb20">No members</h2>
            </div>
            <div class="col-sm-6 col-xl-3" v-if="$store.state.user.name.toLowerCase().includes(search.toLowerCase())">

                <nuxt-link :to="`/user`" class="c-card is-animated u-text-center" style="display: block;">
                    <div class="c-avatar u-inline-flex u-mb-small">
                        <img class="c-avatar__img" :src="$store.state.user.picture" alt="Clark">
                    </div>
                    <h4>{{$store.state.user.name}}</h4>
                    <p class="u-pb-small u-mb-small u-border-bottom"></p>

                    <p class="u-h4">
                        {{$store.state.user.receivedKudos}} kudos
                    </p>
                </nuxt-link>
            </div>
            <div class="col-sm-6 col-xl-3" v-for="member of members">

                <nuxt-link :to="`/user/${member._id}`" class="c-card is-animated u-text-center" style="display: block;">
                    <div class="c-avatar u-inline-flex u-mb-small">
                        <img class="c-avatar__img" :src="member.imgPaths.image_72" alt="Clark">
                    </div>
                    <h4>{{member.realName}}</h4>
                    <p class="u-pb-small u-mb-small u-border-bottom"></p>

                    <p class="u-h4">
                        {{member.receivedKudos}} kudos
                    </p>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                search: "",
            }
        },
        computed:{
            members: function () {
                return this.$store.state.companies.employees.filter((value)=>{
                    return value.realName.toLowerCase().includes(this.search.toLowerCase());
                })
            }
        },
        created(){
            console.log(this.$store.state.companies.employees);
        }
    }
</script>

<style scoped>

</style>