<template>
    <div class="c-card" data-mh="dashboard3-cards">
        <h4 class="pb10">Send Kudos</h4>
        <form @submit.prevent="submit">
            <div class="row">
                <div class="col-md-5">
                    <div class="c-select u-mb-xsmall">
                        <select class="c-select__input" v-model="form.to" type="text" placeholder="Select"
                                @blur="$v.form.to.$touch()"
                                :class="{'c-input--danger': $v.form.to.$error}">
                            <option value="" style="display: none" disabled selected>Select user</option>
                            <option :value="employee._id" v-for="employee of $store.state.companies.employees">
                                {{employee.realName?employee.realName:""}}
                            </option>
                        </select>
                        <small class="c-field__message  u-color-danger"
                               v-if="$v.form.to.$dirty && !$v.form.to.required">
                            <i class="feather icon-info"></i>Please choose user
                        </small>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="c-field u-mb-xsmall">
                        <input class="c-input" v-model.lazy="form.amount" type="number" min="0"
                               :class="{'c-input--danger': $v.form.amount.$error}"
                               @blur="$v.form.amount.$touch()"
                               :max="$store.state.user.kudosToGive"
                               placeholder="Amount of kudos">
                        <small class="c-field__message  u-color-danger"
                               v-if="$v.form.amount.$dirty && !$v.form.amount.required">
                            <i class="feather icon-info"></i>Please enter amount of kudos
                        </small>
                        <small class="c-field__message  u-color-danger"
                               v-if="$v.form.amount.$dirty && !$v.form.amount.numeric">
                            <i class="feather icon-info"></i>Please enter number
                        </small>
                        <small class="c-field__message  u-color-danger"
                               v-if="$v.form.amount.$dirty && !$v.form.amount.between">
                            <i class="feather icon-info"></i>Please enter amount between 0 and
                            {{$store.state.user.kudosToGive}}
                        </small>
                    </div>

                </div>
                <div class="col-md-5">
                    <div class="c-field u-mb-xsmall">
                        <input class="c-input" v-model="form.comment" type="text" @blur="$v.form.comment.$touch()"
                               placeholder="Message" :class="{'c-input--danger': $v.form.comment.$error}">
                        <small class="c-field__message  u-color-danger"
                               v-if="$v.form.comment.$dirty && !$v.form.comment.required">
                            <i class="feather icon-info"></i>This is a required field
                        </small>
                    </div>
                </div>
            </div>
            <button class="c-btn c-btn--info" v-if="!$v.$invalid">
                Send
            </button>
            <small class="c-field__message  u-color-danger"
                   v-if="invalid">
                <i class="feather icon-info"></i>Cannot send kudos
            </small>
            <small class="c-field__message  u-color-success"
                   v-if="sent">
                <i class="feather icon-info"></i>Kudos sent
            </small>
        </form>
    </div>
</template>

<script>
    import {required, numeric, between} from 'vuelidate/lib/validators'

    export default {
        name: "index-send-kudos",
        data: function () {
            return {
                form: {
                    to: "",
                    amount: "",
                    comment: ""
                },
                invalid: false,
                sent: false,
            }
        },
        validations() {
            return {
                form: {
                    to: {
                        required
                    },
                    amount: {
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
                form["from"] = this.$store.state.auth.userId;
                this.$axios.post("/transact-kudos", form)
                    .then((res) => {
                        this.$store.state.user.kudosToGive-=this.form.amount;
                        this.$v.$reset();
                        this.form={
                            to: "",
                            amount: "",
                            comment: ""
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