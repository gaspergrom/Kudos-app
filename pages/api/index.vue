{{{{raw}}}}
<template>
    <section class="container">
        <div class="c-select u-mb-xsmall">
            <select class="c-select__input" v-model="form.type">
                <option val="POST">POST</option>
                <option val="GET">GET</option>
                <option val="PATCH">PATCH</option>
                <option val="DELETE">DELETE</option>
            </select>
        </div>
        <div class="c-field">
            <label class="c-field__label">Url</label>
            <input class="c-input" v-model="form.url" type="text" placeholder="URL">
        </div>
        <div class="c-field">
            <label class="c-field__label">params</label>
            <textarea class="c-input" v-model="form.params" placeholder="JSON format"></textarea>
        </div>
        <button class="c-btn c-btn--info" @click="submit">send</button>
        <p>
            {{text}}
        </p>
    </section>
</template>
{{{{/raw}}}}

<script>
    export default {
        data: function () {
            return {
                form: {
                    type: "",
                    url: "",
                    params: ""
                },
                text: ""
            }
        },
        methods: {
            submit: function () {
                let req;
                switch (this.form.type) {
                    case "GET":
                        req = this.$axios.get(this.form.url, {
                            params: this.form.params.trim().length > 0 ? JSON.parse(this.form.params) : {}
                        });
                        break;
                    case "POST":
                        req = this.$axios.post(this.form.url, {
                            params: this.form.params.trim().length > 0 ? JSON.parse(this.form.params) : {}
                        });
                        break;
                    case "PATCH":
                        req = this.$axios.patch(this.form.url, {
                            params: this.form.params.trim().length > 0 ? JSON.parse(this.form.params) : {}
                        });
                        break;
                    case "DELETE":
                        req = this.$axios.delete(this.form.url, {
                            params: this.form.params.trim().length > 0 ? JSON.parse(this.form.params) : {}
                        });
                        break;
                }
                let self = this;
                req.then(function (res) {
                    self.text = res;
                })
                    .catch(function (err) {
                        self.text = err;
                    })
            }
        }
    }
</script>

<style scoped>
</style>
