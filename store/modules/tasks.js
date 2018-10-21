export default {
    state: {
        tasks: [
        ]
    },

    mutations: {
        GET_TASKS: function (state) {
            this.$axios.get("/tasks")
                .then((res) => {
                    console.log("TASKS", res)
                    state.tasks = res.data;
                })
        }
    },
    gettes: {}
}