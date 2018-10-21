<template>
    <div class="container pb90">
        <div class="row u-pv-small">
            <div class="col-lg-5 u-text-center u-ml-auto u-mr-auto">
                <h1>Manage shop</h1>
            </div>
        </div>
        <div class="flex pl15 pr15">
            <div class="col-lg-4" v-for="(item, i) of $store.state.shop.items">
                <div class="c-plan">
                    <div>
                        <img :src="item.imgPath" class="img">
                    </div>
                    <div class="c-field u-mb-small">
                        <input class="c-input" v-model="item.title" type="text" placeholder="Title">
                    </div>
                    <div class="c-field u-mb-small">
                        <input class="c-input" v-model="item.amount" type="number" min="0" placeholder="Amount">
                    </div>
                    <div class="c-field u-mb-small">
                        <input class="c-input" v-model="item.imgPath" type="text" placeholder="Image url">
                    </div>
                    <div>
                        <button class="c-btn c-btn--danger c-btn--outline c-btn--fullwidth"
                                @click="$store.state.shop.items.splice(i, 1)">Remove
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="c-plan" @click="addItem">
                    <span class="feather icon-plus"></span>
                </div>
            </div>
        </div>
        <div class="pl30 pr30">
            <h2>Redeems</h2>
        </div>
        <div class="c-table-responsive@tablet pl30 pr30">
            <table class="c-table">
                <thead class="c-table__head">
                <tr class="c-table__row">
                    <th class="c-table__cell c-table__cell--head">Member</th>
                    <th class="c-table__cell c-table__cell--head">Item</th>
                    <th class="c-table__cell c-table__cell--head">Amount</th>
                    <th class="c-table__cell c-table__cell--head" style="width: 100px;">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr class="c-table__row" v-for="redeem of $store.state.redeem.items">
                    <td class="c-table__cell">
                        <div class="o-media">
                            <div class="o-media__img u-mr-xsmall">
                                <div class="c-avatar c-avatar--small">
                                    <img class="c-avatar__img" src="http://via.placeholder.com/72">
                                </div>
                            </div>
                            <div class="o-media__body">
                                <h6>Adam Sandler</h6>
                            </div>
                        </div>
                    </td>
                    <td class="c-table__cell"></td>
                    <td class="c-table__cell"> kudos</td>
                    <td class="c-table__cell">
                        <button class="c-btn c-btn--info" @click="finish(redeem._id)">Finish</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        created() {
            this.$store.commit("GET_SHOP");
            this.$store.commit("GET_REDEEM");
        },
        beforeDestroy(){
           this.$axios.patch("/kudos-redeems-options", {
               items: this.$store.state.shop.items
           })
               .then((res) => {
                   this.$store.command("GET_SHOP");
               })
               .catch((err)=>{
               })
        },
        methods: {
            addItem: function () {
                this.$store.state.shop.items.push({"title": "", "amount": 0, "imgPath": ""})
            },
            finish: function (id) {
                
            }
        }
    }
</script>

<style scoped>

</style>