<template>
    <div class="container">
        <div class="row pb20">
            <div class="col-md-6">
                <div class="c-field">
                    <input class="c-input" id="input1" type="search" placeholder="Search...">
                </div>
            </div>
            <div class="col-md-3">
                <button class="c-btn c-btn--info" @click="add.open=true">Add new department</button>
                <div class="c-modal modal fade" :style="{'display': add.open?'block':'none'}">
                    <div class="c-modal__dialog modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="c-card u-p-medium u-mh-auto" style="max-width:500px;">
                                <h3>Modal Title</h3>
                                <p class="u-text-mute u-mb-small">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum similique, dolores dolorem perferendis inventore illum dicta. Nostrum, officiis alias distinctio deleniti aliquid eum dolorum sed fugit omnis molestias! Magnam, animi.</p>
                                <button class="c-btn c-btn--info" data-dismiss="modal">
                                    Ok, just close this modal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <button class="c-btn c-btn--info">Upload json</button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12" v-if="$store.state.companies.departments.length===0">
                <h2 class="text-center">You don't have any departments yet</h2>
            </div>
            <div class="col-sm-6 col-xl-3" v-for="department of $store.state.companies.departments">
                <nuxt-link :to="`/company/department/${department.slug}`" class="c-card is-animated u-text-center">
                    <h4>{{departments.title}}</h4>
                    <p>150 members</p>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                add: {
                    open: false,
                }
            }
        }
    }
</script>

<style scoped>

</style>