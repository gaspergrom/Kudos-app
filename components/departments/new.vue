<template>
    <div class="col-md-3">
        <button class="c-btn c-btn--info" @click="add.open=true">Add new department</button>
        <div class="modal-backdrop fade show" :style="{'display': add.open?'block':'none'}"
        ></div>
        <div class="c-modal modal fade" @click="add.open=false" :style="{'display': add.open?'block':'none'}">
            <div class="c-modal__dialog modal-dialog" @click.stop="null" role="document">
                <div class="modal-content">
                    <div class="c-card u-p-medium u-mh-auto" style="max-width:500px;">
                        <h3 class="u-mb-small">Add new department</h3>
                        <form @submit.prevent="addDepartment">
                            <div class="c-field u-mb-small">
                                <input class="c-input" type="text" v-model="add.title"
                                       @blur="$v.add.title.$touch()"
                                       :class="{'c-input--danger': $v.add.title.$error}"
                                       placeholder="Department name">
                                <small class="c-field__message  u-color-danger"
                                       v-if="$v.add.title.$dirty && !$v.add.title.required">
                                    <i class="feather icon-info"></i>Please enter department name
                                </small>
                            </div>
                            <div class="c-select u-mb-small">
                                <select class="c-select__input"
                                        v-model="add.manager"
                                        @blur="$v.add.manager.$touch()"
                                        :class="{'c-input--danger': $v.add.manager.$error}">
                                    <option value="" style="display: none" disabled selected>Select manager
                                    </option>
                                    <option :value="$store.state.auth.userId">
                                        {{$store.state.user.name}}
                                    </option>
                                    <option :value="employee._id"
                                            v-for="employee of $store.state.companies.employees">
                                        {{employee.realName?employee.realName:""}}
                                    </option>
                                </select>
                                <small class="c-field__message  u-color-danger"
                                       v-if="$v.add.manager.$dirty && !$v.add.manager.required">
                                    <i class="feather icon-info"></i>Please choose user
                                </small>
                            </div>
                            <button class="c-btn c-btn--info" data-dismiss="modal" v-if="!$v.$invalid">
                                Add department
                            </button>
                            <small class="c-field__message  u-color-danger"
                                   v-if="invalid">
                                <i class="feather icon-info"></i>Cannot add department
                            </small>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {required} from "vuelidate/lib/validators";
    export default {
        name: "departments-new",
        data: function () {
            return {
                add: {
                    open: false,
                    title: "",
                    manager: ""
                },
                invalid: false,
            }
        },
        validations() {
            return {
                add: {
                    title: {
                        required
                    },
                    manager: {
                        required
                    }
                },
            }
        },
        methods: {
            addDepartment: function () {
                if (this.$v.$invalid) {
                    return;
                }
                this.invalid = false;
                let form = this.add;
                this.$axios.post(`/companies/${this.$store.state.auth.teamId}/departments`, form)
                    .then((res) => {
                        console.log("POST::DEPARTMENT", res);
                        this.$store.state.companies.departments=res.data.departments;
                        this.$v.$reset();
                        this.add = {
                            open: false,
                            title: "",
                            manager: ""
                        };
                    })
                    .catch((err) => {
                        this.invalid = true;
                    })
            },
        }
    }
</script>

<style scoped>

</style>