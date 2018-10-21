<template>
    <div class="col-md-6">
        <div class="c-card mb0" data-mh="dashboard3-cards">
            <h4>Leaderboard</h4>
        </div>
        <div class="c-tabs">
            <nav class="c-tabs__list nav nav-tabs" id="myTab" role="tablist">
                <a class="c-tabs__link" :class="{'active': tabs===0}" @click="tabs=0">Weekly</a>
                <a class="c-tabs__link" :class="{'active': tabs===1}" @click="tabs=1">Monthly</a>
                <a class="c-tabs__link" :class="{'active': tabs===2}" @click="tabs=2">Yearly</a>
            </nav>
            <div class="c-tabs__content tab-content" id="nav-tabContent">
                <div class="c-tabs__pane" :class="{'active': tabs===0}">
                    <div class="o-line u-pb-small u-mb-small u-border-bottom">
                        <div class="o-media">
                            <div class="o-media__img u-mr-small">
                                <div class="c-avatar c-avatar--xsmall">
                                    <img class="c-avatar__img" src="http://via.placeholder.com/72" alt="Name">
                                </div>
                            </div>

                            <div class="o-media__body">
                                <h6>Justine Henderson</h6>
                            </div>
                        </div>

                        <h6>150 k
                            <span class="c-icon c-icon--warning u-mb-small"
                                  style="height: 30px; width: 30px;margin-bottom: 0;">
                              <i class="feather icon-award"></i>
                            </span>
                        </h6>
                    </div>
                    <div class="o-line u-pb-small u-mb-small u-border-bottom">
                        <div class="o-media">
                            <div class="o-media__img u-mr-small">
                                <div class="c-avatar c-avatar--xsmall">
                                    <img class="c-avatar__img" src="http://via.placeholder.com/72" alt="Name">
                                </div>
                            </div>

                            <div class="o-media__body">
                                <h6>Waylon Dalton</h6>
                                <p>Pulse ltd</p>
                            </div>
                        </div>

                        <h6>12 k
                            <span class="c-icon c-icon--warning u-mb-small" style="height: 30px; width: 30px;margin-bottom: 0; background: #C0C0C0">
                  <i class="feather icon-award"></i>
                </span>
                        </h6>
                    </div>

                    <div class="o-line u-pb-small u-mb-small u-border-bottom">
                        <div class="o-media">
                            <div class="o-media__img u-mr-small">
                                <div class="c-avatar c-avatar--xsmall">
                                    <img class="c-avatar__img" src="http://via.placeholder.com/72" alt="Name">
                                </div>
                            </div>

                            <div class="o-media__body">
                                <h6>Warren Hampton</h6>
                                <p>Restful ltd</p>
                            </div>
                        </div>

                        <h6>10 k
                            <span class="c-icon c-icon--warning u-mb-small" style="height: 30px; width: 30px;margin-bottom: 0; background: #cd7f32">
                  <i class="feather icon-award"></i>
                </span>
                        </h6>
                    </div>
                </div>
                <div class="c-tabs__pane" :class="{'active': tabs===1}">
                    <div class="o-line u-pb-small u-mb-small u-border-bottom">
                        <div class="o-media">
                            <div class="o-media__img u-mr-small">
                                <div class="c-avatar c-avatar--xsmall">
                                    <img class="c-avatar__img" src="http://via.placeholder.com/72" alt="Name">
                                </div>
                            </div>

                            <div class="o-media__body">
                                <h6>Justine Henderson</h6>
                            </div>
                        </div>

                        <h6>150 k
                            <span class="c-icon c-icon--warning u-mb-small"
                                  style="height: 30px; width: 30px;margin-bottom: 0;">
                              <i class="feather icon-award"></i>
                            </span>
                        </h6>
                    </div>
                    <div class="o-line u-pb-small u-mb-small u-border-bottom">
                        <div class="o-media">
                            <div class="o-media__img u-mr-small">
                                <div class="c-avatar c-avatar--xsmall">
                                    <img class="c-avatar__img" src="http://via.placeholder.com/72" alt="Name">
                                </div>
                            </div>

                            <div class="o-media__body">
                                <h6>Waylon Dalton</h6>
                                <p>Pulse ltd</p>
                            </div>
                        </div>

                        <h6>12 k
                            <span class="c-icon c-icon--warning u-mb-small" style="height: 30px; width: 30px;margin-bottom: 0; background: #C0C0C0">
                  <i class="feather icon-award"></i>
                </span>
                        </h6>
                    </div>

                    <div class="o-line u-pb-small u-mb-small u-border-bottom">
                        <div class="o-media">
                            <div class="o-media__img u-mr-small">
                                <div class="c-avatar c-avatar--xsmall">
                                    <img class="c-avatar__img" src="http://via.placeholder.com/72" alt="Name">
                                </div>
                            </div>

                            <div class="o-media__body">
                                <h6>Warren Hampton</h6>
                                <p>Restful ltd</p>
                            </div>
                        </div>

                        <h6>10 k
                            <span class="c-icon c-icon--warning u-mb-small" style="height: 30px; width: 30px;margin-bottom: 0; background: #cd7f32">
                  <i class="feather icon-award"></i>
                </span>
                        </h6>
                    </div>
                </div>
                <div class="c-tabs__pane" :class="{'active': tabs===2}">
                    <div class="o-line u-pb-small u-mb-small u-border-bottom">
                        <div class="o-media">
                            <div class="o-media__img u-mr-small">
                                <div class="c-avatar c-avatar--xsmall">
                                    <img class="c-avatar__img" src="http://via.placeholder.com/72" alt="Name">
                                </div>
                            </div>

                            <div class="o-media__body">
                                <h6>Justine Henderson</h6>
                            </div>
                        </div>

                        <h6>150 k
                            <span class="c-icon c-icon--warning u-mb-small"
                                  style="height: 30px; width: 30px;margin-bottom: 0;">
                              <i class="feather icon-award"></i>
                            </span>
                        </h6>
                    </div>
                    <div class="o-line u-pb-small u-mb-small u-border-bottom">
                        <div class="o-media">
                            <div class="o-media__img u-mr-small">
                                <div class="c-avatar c-avatar--xsmall">
                                    <img class="c-avatar__img" src="http://via.placeholder.com/72" alt="Name">
                                </div>
                            </div>

                            <div class="o-media__body">
                                <h6>Waylon Dalton</h6>
                                <p>Pulse ltd</p>
                            </div>
                        </div>

                        <h6>12 k
                            <span class="c-icon c-icon--warning u-mb-small" style="height: 30px; width: 30px;margin-bottom: 0; background: #C0C0C0">
                  <i class="feather icon-award"></i>
                </span>
                        </h6>
                    </div>

                    <div class="o-line u-pb-small u-mb-small u-border-bottom">
                        <div class="o-media">
                            <div class="o-media__img u-mr-small">
                                <div class="c-avatar c-avatar--xsmall">
                                    <img class="c-avatar__img" src="http://via.placeholder.com/72" alt="Name">
                                </div>
                            </div>

                            <div class="o-media__body">
                                <h6>Warren Hampton</h6>
                                <p>Restful ltd</p>
                            </div>
                        </div>

                        <h6>10 k
                            <span class="c-icon c-icon--warning u-mb-small" style="height: 30px; width: 30px;margin-bottom: 0; background: #cd7f32">
                  <i class="feather icon-award"></i>
                </span>
                        </h6>
                    </div>
                </div>
            </div>

            <!--

            -->

        </div>
    </div>
</template>

<script>
    export default {
        name: "statistics-leaderboard",
        data: function () {
            return {
                tabs: 0
            }
        }
    }
</script>

<style scoped>

</style>