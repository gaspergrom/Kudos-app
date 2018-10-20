<template>
    <div class="container">
        <div class="row pb20">
            <div class="col-md-6">
                <div class="c-field">
                    <input class="c-input" id="input1" type="search" placeholder="Search...">
                </div>
            </div>
            <departments-new></departments-new>
            <departments-json></departments-json>
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
    import {required} from "vuelidate/lib/validators";
    import DepartmentsJson from "../../../components/departments/json";
    import DepartmentsNew from "../../../components/departments/new";

    export default {
        components: {DepartmentsNew, DepartmentsJson},

    }
</script>

<style scoped>

</style>