export default {
    state: {
        items: [
        ]
    },

    mutations: {
        GET_SHOP: function (state) {
            this.$axios.get("/redeem-kudos")
                .then((res)=>{
                    console.log("SHOP", res);
                    state.items=res.data;
                })

        }
    },
    gettes: {
    }
}