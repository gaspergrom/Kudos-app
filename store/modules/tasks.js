export default {
    state: {
        tasks: [
            {
                accepted: false,
                finished: false,
                name: "Nejc Velkavrh",
                message: "Nej mi gre en po kosiu",
                kudos: 5
            }
        ]
    },

    mutations: {
        GET_TASKS: function (state) {
  /*          this.$axios.get("/tasks")
                .then((res)=>{
                    console.log("TASKS", res)
                    state.tasks=res.data;
                })*/
        }
    },
    gettes: {
    }
}