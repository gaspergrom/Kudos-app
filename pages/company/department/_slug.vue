<template>
    <div class="container">
        <div class="row pb20">
            {{users}}
            <div class="col-md-6">
                <div class="c-field">
                    <input class="c-input" type="search" placeholder="Search...">
                </div>
            </div>
            <div class="col-md-6">
                <div class="c-select u-mb-xsmall" style="width: calc(100% - 50px)">
                    <select class="c-select__input" v-model="form.user" type="text" placeholder="Select">
                        <option value="" style="display: none" disabled selected>Select users</option>
                        <option :value="employee._id" v-for="employee of $store.state.companies.employees">
                            {{employee.realName?employee.realName:""}}
                        </option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6 col-xl-3" v-for="member of members">

                <div class="c-card is-animated u-text-center">
                    <div class="c-avatar u-inline-flex u-mb-small">
                        <img class="c-avatar__img" src="http://via.placeholder.com/72" alt="Clark">
                    </div>
                    <h4>Andrea Serrano</h4>
                    <p class="u-pb-small u-mb-small u-border-bottom">Facebook Inc.</p>

                    <p class="u-h4">
                        150
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
                department: {},
                form: {
                    user: []
                }
            }
        },
        computed: {
            members: function () {

            }
        },
        created() {
            let slug = this.$route.params.slug;
            this.departments = this.$store.state.companies.departments.filter((dep) => {
                return dep.slug === slug;
            })[0];
        }
    }
</script>

<style scoped>

</style>