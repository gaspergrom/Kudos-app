import Cookies from "js-cookie";
export default {
    state: {
        name: "Celtra",
        slug: "celtra",
        employees: [],
        departments: []
    },

    mutations: {
        GET_COMPANIES: function (state, teamId, auth) {
            this.$axios.get(`/companies/${teamId}`)
                .then((res) => {
                    state.name = res.data.title;
                    state.slug = res.data.slug;
                    state.departments = res.data.departments;
                    this.$axios.get(`/companies/${res.data._id}/employees`)
                        .then((res) => {

                            state.employees = res.data.filter((value) => {
                                return value.slackId !== "USLACKBOT";
                            });
                        })
                });
        }
    },
    gettes: {
    }
}