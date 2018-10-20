<template>
    <div class="container">
        <div class="row u-pv-small">
            <div class="col-lg-5 u-text-center u-ml-auto u-mr-auto">
                <h1>Gift shop</h1>
                <p class="u-mb-large u-h4">Redeem your kudos</p>
            </div>
        </div>
        <div class="row u-mb-xlarge">
            <div class="col-lg-4" v-for="item of $store.state.shop.items">
                <div class="c-plan">
              <span class="c-plan__icon c-icon c-icon--info c-icon--large">
                <i class="feather icon-shopping-cart"></i>
              </span>

                    <h3 class="c-plan__title">{{item.name}}</h3>
                    <div class="c-plan__price">{{item.price}}<span class="c-plan__duration">kudos</span></div>

                    <button class="c-btn c-btn--info c-btn--outline c-btn--fullwidth" :disabled="item.price>$store.state.user.availableKudos">Redeem</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped>

</style>