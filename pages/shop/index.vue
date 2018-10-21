<template>
    <div class="container">
        <div class="row u-pv-small">
            <div class="col-lg-5 u-text-center u-ml-auto u-mr-auto">
                <h1>Gift shop</h1>
                <p class="u-mb-large u-h4">Redeem your kudos</p>
            </div>
        </div>
        <div class="row u-mb-xlarge">
            <div class="col-lg-4" v-for="(item, i) of $store.state.shop.items">
                <div class="c-plan">
                    <div>
                        <img :src="item.imgPath" class="img">
                    </div>
                    <h3 class="c-plan__title">{{item.title}}</h3>
                    <div class="c-plan__price">{{item.amount}}<span class="c-plan__duration">kudos</span></div>

                    <button class="c-btn c-btn--info c-btn--outline c-btn--fullwidth" @click="redeem(i)" :disabled="item.amount>$store.state.user.availableKudos">Redeem</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            redeem: function (i) {
                this.$axios.post(`/kudos-redeems`, {
                    redeemOption: i,
                    employeeId: this.$store.state.auth.userId
                })
                    .then((res)=>{
                        console.log(res);
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            }
        },
        created(){
            this.$store.commit("GET_SHOP")
        }
    }
</script>

<style scoped>

</style>