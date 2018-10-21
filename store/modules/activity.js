export default {
    state: {
        activity: []
    },

    mutations: {
        GET_ACTIVITY: function (state) {
            this.$axios.get("/kudos-txs")
                .then((res) => {
                    state.activity = res.data.reverse();
                })
        },

    },
    gettes: {
        activityFiltered: function (state, other) {
            return state.activity.filter((val)=>{
            });
        }
    }
}