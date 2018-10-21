<template>
    <div class="container">
        <div class="row pb20">
            <div class="col-md-6">
                <div class="c-field">
                    <input class="c-input" v-model="search" type="search" placeholder="Search...">
                </div>
            </div>
            <departments-new></departments-new>
            <departments-json></departments-json>
        </div>
        <div class="row">
            <div class="col-md-12" v-if="$store.state.companies.departments===[]">
                <h2 class="text-center">You don't have any departments yet</h2>
            </div>
            <div class="col-sm-6 col-xl-3" v-for="department of filterDepartments">
                <nuxt-link :to="`/company/department/${department.slug}`"
                           class="c-card is-animated u-text-center block">
                    <h4>{{department.title}}</h4>
                    <p>{{department.members.length}} members</p>
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
        data: function () {
            return {
                search: "",
            }
        },
        computed: {
            filterDepartments: function () {
                return this.$store.state.companies.departments.filter((value) => {
                    return value.title.toLowerCase().includes(this.search.toLowerCase());
                })
            }
        }
    }
</script>

<style scoped>

</style>