export default {
    state: {
        items: []
    },

    mutations: {
        GET_REDEEM: function (state) {
            this.$axios.get("/kudos-redeems")
                .then((res) => {
                    console.log("REDEEMS", res);
                    state.items = res.data;
                })
        }
    },
    gettes: {}
}