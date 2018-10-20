<template>
    <div class="container">
        <div class="row flex--center">

            <div class="col-md-5">
                <div class="c-card">
                    <div class="u-text-center">
                        <div class="c-avatar c-avatar--large u-mb-small u-inline-flex">
                            <img class="c-avatar__img" :src="$store.state.user.picture" alt="Avatar">
                        </div>

                        <h5>{{$store.state.user.name}}</h5>
                    </div>

                    <span class="c-divider u-mv-small"></span>

                    <span class="c-text--subtitle text-center width100 block">Avaliable Kudos</span>
                    <p class="u-mb-small u-text-large text-center">{{$store.state.user.avaliableKudos}}</p>

                    <span class="c-text--subtitle text-center width100 block">Kudos to give</span>
                    <p class="u-mb-small u-text-large text-center">{{$store.state.user.kudosToGive}}/{{$store.state.globals.maxKudosPerMonth}}</p>

                    <span class="c-text--subtitle text-center width100 block">Received Kudos</span>
                    <p class="u-mb-small u-text-large text-center">{{$store.state.user.receivedKudos}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style scoped>

</style>