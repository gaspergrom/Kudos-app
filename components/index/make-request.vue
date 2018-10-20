<template>
    <div class="c-card" data-mh="dashboard3-cards">
        <h4 class="pb10">Make request</h4>
        <form @submit.prevent="submit">
            <div class="row">
                <div class="col-md-5">
                    <div class="c-select u-mb-xsmall">
                        <select class="c-select__input" v-model="form.department" type="text" placeholder="Select"
                                @blur="$v.form.department.$touch()"
                                :class="{'c-input--danger': $v.form.department.$error}">
                            <option value="" style="display: none" disabled selected>Select department</option>
                            <option :value="department._id" v-for="department of $store.state.companies.departments">
                                {{department}}
                            </option>
                        </select>
                        <small class="c-field__message  u-color-danger"
                               v-if="$v.form.department.$dirty && !$v.form.department.required">
                            <i class="feather icon-info"></i>Please choose department
                        </small>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="c-field u-mb-xsmall">
                        <input class="c-input" v-model.lazy="form.kudosReward" type="number" min="0"
                               :class="{'c-input--danger': $v.form.kudosReward.$error}"
                               @blur="$v.form.kudosReward.$touch()"
                               :max="$store.state.user.kudosToGive"
                               placeholder="Amount of kudos">
                        <small class="c-field__message  u-color-danger"
                               v-if="$v.form.kudosReward.$dirty && !$v.form.kudosReward.required">
                            <i class="feather icon-info"></i>Please enter amount of kudos
                        </small>
                        <small class="c-field__message  u-color-danger"
                               v-if="$v.form.kudosReward.$dirty && !$v.form.kudosReward.numeric">
                            <i class="feather icon-info"></i>Please enter number
                        </small>
                        <small class="c-field__message  u-color-danger"
                               v-if="$v.form.kudosReward.$dirty && !$v.form.kudosReward.between">
                            <i class="feather icon-info"></i>Please enter amount between 0 and {{$store.state.user.kudosToGive}}
                        </small>
                    </div>

                </div>
                <div class="col-md-5">
                    <div class="c-field u-mb-xsmall">
                        <input class="c-input" v-model="form.message" type="text" @blur="$v.form.comment.$touch()"
                               placeholder="Message" :class="{'c-input--danger': $v.form.comment.$error}">
                        <small class="c-field__message  u-color-danger"
                               v-if="$v.form.comment.$dirty && !$v.form.comment.required">
                            <i class="feather icon-info"></i>This is a required field
                        </small>
                    </div>
                </div>
            </div>
            <button class="c-btn c-btn--info" v-if="!$v.$invalid">
                Make
            </button>
            <small class="c-field__message  u-color-danger"
                   v-if="invalid">
                <i class="feather icon-info"></i>Error making request
            </small>
            <small class="c-field__message  u-color-success"
                   v-if="sent">
                <i class="feather icon-info"></i>Request has been made
            </small>
        </form>
    </div>
</template>

<script>
    import {required, numeric, between} from 'vuelidate/lib/validators'

    export default {
        name: "index-make-request",
        data: function () {
            return {
                form: {
                    department: "",
                    kudosReward: 0,
                    comment: "",
                },
                invalid: false,
                sent: false
            }
        },
        validations() {
            return {
                form: {
                    department: {
                        required
                    },
                    kudosReward: {
                        required,
                        numeric,
                        between: between(0, this.$store.state.user.kudosToGive)
                    },
                    comment: {
                        required
                    }
                }
            }

        },

        methods: {
            submit: function () {
                if(this.$v.$invalid){
                    return;
                }
                this.invalid=false;
                this.sent=false;
                let form = this.form;
                form["assignedBy"] = this.$store.state.auth.userId;
                this.$axios.post("/tasks", form)
                    .then((res) => {
                        this.$v.$reset();
                        this.form={
                            assignedBy: "",
                            kudosReward: 0,
                            comment: "",
                        };
                        this.sent=true;
                    })
                    .catch((err) => {
                        this.invalid=true;
                    })
            }
        }
    }
</script>

<style scoped>

</style>