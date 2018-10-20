{{{{raw}}}}
<template>
    <div class="c-404 vh100">
        <div class="c-404__content">
            <h1 class="c-404__title">{{ error.statusCode }}</h1>
            <p class="c-404__des">{{ error.message }}</p>

            <nuxt-link  to="/" v-if="error.statusCode === 404" class="c-404__link" href="#"><i class="feather icon-arrow-left"></i> Retrun to Homepage</nuxt-link>
        </div>
    </div>
</template>
{{{{/raw}}}}
<script>
    export default {
        props: ['error'],
        layout: "main"
    }
</script>
