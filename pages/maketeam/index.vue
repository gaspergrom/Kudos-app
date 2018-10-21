<template>
    <div class="container">
        <div class="row">
            <div class="col-xl-4" v-for="(item, i) of items" @click="changeState(i)">
                <div class="c-state-card " :class="{'c-state-card--info':item.check}">
                    <h2 class="c-state-card__number text-center">{{item.title}}</h2>
                </div>
            </div>
            <div class="col-md-12">
                <button class="c-btn c-btn--info">Make a team</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                items: []
            }
        },
        methods: {
            changeState(i){
                this.items[i].check=!this.items[i].check;
                this.$forceUpdate()
            }
        },
        created() {
            this.$store.commit("GET_COMPANIES", this.$store.state.auth.teamId, this.$store.state.auth);
            this.items = this.$store.state.companies.departments.map((val) => {
                let obj = val;
                obj.check = false;
                return obj;
            })
        }
    }
</script>

<style scoped>

</style>