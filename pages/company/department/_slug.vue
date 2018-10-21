<template>
    <div class="container">
        <div class="row pb20">
            <div class="col-md-6">
                <div class="c-field">
                    <input class="c-input" type="search" placeholder="Search...">
                </div>
            </div>
            <div class="col-md-6">
                <div class="flex">
                    <div class="c-select u-mb-xsmall" style="width: calc(100% - 61px)">
                        <select class="c-select__input" v-model="form.user">
                            <option value="" style="display: none" disabled selected>Select user</option>
                            <option :value="$store.state.auth.userId" v-if="!memberIds.includes($store.state.auth.userId)">
                                {{$store.state.user.name}}
                            </option>
                            <option :value="employee._id" v-for="(employee, i) of memberNotIncluded">
                                {{employee.realName?employee.realName:""}}
                            </option>
                        </select>
                    </div>
                    <button class="c-btn c-btn--info c-btn--small" @click="addMember" style="height: 35px;"><span class="feather icon-plus"></span></button>
                </div>

            </div>
        </div>
        <div class="row">
            <div class="col-sm-6 col-xl-3" v-for="member of members">
                <div class="c-card is-animated u-text-center">
                    <div class="c-avatar u-inline-flex u-mb-small">
                        <img class="c-avatar__img" :src="member.imgPaths.image_72" alt="Clark">
                    </div>
                    <h4>{{member.realName || member.name}}</h4>
                    <p class="u-pb-small u-mb-small u-border-bottom"></p>

                    <p class="u-h4">
                        {{member.receivedKudos}}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                slug: "",
                form: {
                    user: ""
                },
                users: [],
            }
        },
        watch: {
            '$route'(to, from) {
                this.slug = this.$route.params.slug;
            }
        },
        computed: {
            department: function () {
                let self = this;
                let arr = this.$store.state.companies.departments.filter((dep) => {
                    return dep.slug === self.slug;
                });
                if(arr.length>0){
                    return arr[0];
                }
                return {members: []};
            },
            members: function(){
                return [...(this.department.members), ...this.users]
            },
            memberIds: function () {
                return this.members.map((val) => val._id)
            },
            memberNotIncluded: function () {
                return this.$store.state.companies.employees.filter((val) =>{
                    return !this.memberIds.includes(val._id);
                })
            }
        },
        methods: {
           addMember: function(){
               if(this.form.user===this.$store.state.auth.userId){
                   this.users.push({
                       _id: this.$store.state.auth.userId,
                       realName: this.$store.state.user.name,
                       imgPaths: {
                           image_72: this.$store.state.user.picture
                       },
                       receivedKudos: this.$store.state.user.receivedKudos
                   });
               }
               else{
                   this.users.push(this.$store.state.companies.employees.find((val)=>{
                       return val._id===this.form.user;
                   }));
               }
               this.form.user="";
           }
        },
        created() {
            this.slug = this.$route.params.slug;
        },
        beforeRouteLeave(to, from, next){
            this.$axios.patch(`/departments/${this.department._id}`, {
                members: this.memberIds
            })
                .then((res)=>{
                    console.log(res);
                    this.$store.commit("GET_COMPANIES", this.$store.auth.teamId, this.$store.state.auth);
                    next();
                })
                .catch((err)=>{
                    console.log(err);
                    next();
                })
        }
    }
</script>

<style scoped>

</style>