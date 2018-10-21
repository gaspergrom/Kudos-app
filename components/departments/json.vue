<template>
    <div class="col-md-3">
        <button class="c-btn c-btn--info" @click="json.open=true">Upload json</button>
        <div class="modal-backdrop fade show" :style="{'display': json.open?'block':'none'}"></div>
        <div class="c-modal modal fade" @click="json.open=false" :style="{'display': json.open?'block':'none'}">
            <div class="c-modal__dialog modal-dialog" @click.stop="null" role="document">
                <div class="modal-content">
                    <div class="c-card u-p-medium u-mh-auto" style="max-width:500px;">
                        <h3 class="u-mb-small">Upload json</h3>
                        <form @submit="uploadJson">
                            <div class="c-field u-mb-small">
                                <input class="c-input" type="file" @change="json.file=$event.target.files[0]" @blur="$v.json.file.$touch()"
                                       :class="{'c-input--danger': $v.json.file.$error}"
                                       accept="*.json">
                                <small class="c-field__message  u-color-danger"
                                       v-if="$v.json.file.$dirty && !$v.json.file.required">
                                    <i class="feather icon-info"></i>Please select json file
                                </small>
                            </div>
                            <button class="c-btn c-btn--info" data-dismiss="modal" v-if="!$v.$invalid">
                                Upload
                            </button>
                            <small class="c-field__message  u-color-danger"
                                   v-if="invalid">
                                <i class="feather icon-info"></i>Cannot upload file
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
        name: "departments-json",
        data: function () {
            return {
                invalid: false,
                json: {
                    open: false,
                    file: ""
                }
            }
        },
        validations() {
            return {
                json: {
                    file: {
                        required
                    }
                }
            }
        },
        methods: {
            uploadJson: function () {
                if (this.$v.$invalid) {
                    return;
                }
                this.invalid = false;
                let form = this.add;
                this.$axios.post(`/company/${$store.state.auth.teamId}/json`, form)
                    .then((res) => {
                        console.log(res);
                        this.$v.$reset();
                        this.json = {
                            open: false,
                            file: ""
                        };
                        this.$store.commit("GET_COMPANIES", this.$store.auth.teamId, this.$store.state.auth);
                    })
                    .catch((err) => {
                        this.invalid = true;
                    })
            }
        }
    }
</script>

<style scoped>

</style>