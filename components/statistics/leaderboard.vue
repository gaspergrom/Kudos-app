<template>
    <div class="col-md-6">
        <div class="c-card mb0" data-mh="dashboard3-cards">
            <h4>Leaderboard</h4>
        </div>
        <div class="c-tabs__pane active">
            <div class="o-line u-pb-small u-mb-small u-border-bottom" v-if="top.length>0">
                <div class="o-media">
                    <div class="o-media__img u-mr-small">
                        <div class="c-avatar c-avatar--xsmall">
                            <img class="c-avatar__img" :src="top[0].user.imgPaths.image_72" alt="Name">
                        </div>
                    </div>

                    <div class="o-media__body">
                        <h6>{{top[0].user.realName || top[0].user.name}}</h6>
                    </div>
                </div>

                <h6>{{top[0].amount}} kudos
                    <span class="c-icon c-icon--warning u-mb-small"
                          style="height: 30px; width: 30px;margin-bottom: 0;">
                              <i class="feather icon-award"></i>
                            </span>
                </h6>
            </div>
            <div class="o-line u-pb-small u-mb-small u-border-bottom"  v-if="top.length>1">
                <div class="o-media">
                    <div class="o-media__img u-mr-small">
                        <div class="c-avatar c-avatar--xsmall">
                            <img class="c-avatar__img" :src="top[1].user.imgPaths.image_72" alt="Name">
                        </div>
                    </div>

                    <div class="o-media__body">
                        <h6>{{top[1].user.realName || top[1].user.name}}</h6>
                    </div>
                </div>

                <h6>{{top[1].amount}} k
                    <span class="c-icon c-icon--warning u-mb-small" style="height: 30px; width: 30px;margin-bottom: 0; background: #C0C0C0">
                  <i class="feather icon-award"></i>
                </span>
                </h6>
            </div>

            <div class="o-line u-pb-small u-mb-small u-border-bottom" v-if="top.length>2">
                <div class="o-media">
                    <div class="o-media__img u-mr-small">
                        <div class="c-avatar c-avatar--xsmall">
                            <img class="c-avatar__img" :src="top[2].user.imgPaths.image_72" alt="Name">
                        </div>
                    </div>

                    <div class="o-media__body">
                        <h6>{{top[2].user.realName || top[2].user.name}}</h6>
                    </div>
                </div>

                <h6>{{top[2].amount}} k
                    <span class="c-icon c-icon--warning u-mb-small" style="height: 30px; width: 30px;margin-bottom: 0; background: #cd7f32">
                  <i class="feather icon-award"></i>
                </span>
                </h6>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "statistics-leaderboard",
        props: ["transactions"],
        computed: {
            top:function () {
                let users={};
                for(let i=0; i<this.transactions.length; i++){
                    if(this.transactions[i].to._id in users){
                        users[this.transactions[i].to._id]["amount"]+=this.transactions[i].amount;
                    }
                    else{
                        users[this.transactions[i].to._id]={
                            amount: this.transactions[i].amount,
                            user: this.transactions[i].to
                        }
                    }
                }
                let arr=Object.values(users).sort((a,b) => (a.amount > b.amount) ? 1 : ((b.amount > a.amount) ? -1 : 0));
                return arr.splice(0, 3)
            }
        }
    }
</script>

<style scoped>

</style>