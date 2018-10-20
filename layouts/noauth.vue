<template>
    <div class="o-page">
        <nuxt></nuxt>
    </div>
</template>

<script>
    import Cookies from "js-cookie";
    export default {
        created(){
            /*if(this.$store.state.auth.userId==null){
                let userId=Cookies.get("userId");
                if(userId){
                    this.$router.push("/");
                }
            }
            else{
                this.$router.push("/");
            }*/
        }
    }
</script>
