export default {
    state: {
        activity: []
    },

    mutations: {
        GET_ACTIVITY: function (state) {
            this.$axios.get("/kudos-txs")
                .then((res) => {
                    console.log("ACTIVITY", res);
                    state.activity = res.data;
                })
        }
    },
    gettes: {}
}