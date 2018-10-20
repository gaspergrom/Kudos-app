{{{{raw}}}}
<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <div class="c-card">
                <span class="c-icon c-icon--info u-mb-small">
                  <i class="feather icon-shopping-cart"></i>
                </span>

                    <h3 class="c-text--subtitle">Available Kudos</h3>
                    <h1>{{$store.state.user.availableKudos}}</h1>
                </div>
            </div>

            <div class="col-md-4">
                <div class="c-card">
                <span class="c-icon c-icon--danger u-mb-small">
                  <i class="feather icon-chevrons-right"></i>
                </span>

                    <h3 class="c-text--subtitle">Kudos to give</h3>
                    <h1>{{$store.state.user.kudosToGive}}/{{$store.state.globals.maxKudosPerMonth}}</h1>
                </div>
            </div>

            <div class="col-md-4">
                <div class="c-card">
                <span class="c-icon c-icon--warning u-mb-small">
                  <i class="feather icon-award"></i>
                </span>

                    <h3 class="c-text--subtitle">Received Kudos</h3>
                    <h1>{{$store.state.user.receivedKudos}}</h1>
                </div>
            </div>

        </div>
        <div class="row">
            <div class="col-md-12">
                <index-send-kudos></index-send-kudos>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <index-make-request></index-make-request>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <index-activity></index-activity>
            </div>
        </div>
    </div>
</template>
{{{{/raw}}}}

<script>
    import IndexSendKudos from "../components/index/send-kudos";
    import IndexMakeRequest from "../components/index/make-request";
    import IndexActivity from "../components/index/activity";
    export default {
        components: {IndexActivity, IndexMakeRequest, IndexSendKudos}
    }
</script>

<style scoped>
</style>
