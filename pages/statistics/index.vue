<template>
    <div class="container">
        <div class="row u-pv-small">
            <div class="col-lg-5 u-text-center u-ml-auto u-mr-auto">
                <h1>Statistics</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="c-card" data-mh="dashboard3-cards">
                    <h4>Leaderboard</h4>
                    <p class="u-mb-medium">Employees with most kudos</p>

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
                            <span class="c-icon c-icon--warning u-mb-small" style="height: 30px; width: 30px;margin-bottom: 0;">
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
            <div class="col-xl-6">
                <div class="c-card" data-mh="overview-cards">
                    <h4>Customers</h4>
                    <p class="u-mb-medium">Lorem ipsum dolor sit amet, consectetur.</p>

                    <div class="c-chart">
                        <div class="c-chart__body">

                            <!-- Chartist.js uses this class to generate the chart -->
                            <div class="pie-chart"></div>
                        </div>

                        <div class="c-chart__legends">
                            <div class="row">
                                <div class="col-6">
                        <span class="c-chart__legend">
                          <i class="c-chart__legend-icon u-bg-info"></i>New Customer
                        </span>
                                </div>

                                <div class="col-6">
                        <span class="c-chart__legend">
                          <i class="c-chart__legend-icon u-bg-pink"></i>Old Customers
                        </span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-6">
                        <span class="c-chart__legend">
                          <i class="c-chart__legend-icon u-bg-fancy"></i>Avg. Customers
                        </span>
                                </div>

                                <div class="col-6">
                        <span class="c-chart__legend">
                          <i class="c-chart__legend-icon u-bg-success"></i>Hi Customers
                        </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <div class="col-xl-5">
                <div class="c-card">
                    <h4>Latests Transactions</h4>
                    <p class="u-mb-medium">Activity from 4 Jan 2017 to 10 Jan 2017</p>

                    <div class="c-feed">
                        <div class="c-feed__item">
                            <p>New order received from Canada by #49832</p>
                            <p class="u-text-xsmall">just now</p>
                        </div>

                        <div class="c-feed__item c-feed__item--success">
                            <p>New order received from Canada by #49832</p>
                            <p class="u-text-xsmall">5 mins ago</p>
                        </div>

                        <div class="c-feed__item">
                            <p>New order received from Canada by #49832</p>
                            <p class="u-text-xsmall">30 mins ago</p>
                        </div>

                        <div class="c-feed__item c-feed__item--fancy">
                            <p>New order received from Canada by #49832</p>
                            <p class="u-text-xsmall">3 hours ago</p>
                        </div>

                        <div class="c-feed__item c-feed__item--danger">
                            <p>Payment failed from USA by #49832</p>
                            <p class="u-text-xsmall">5 hours ago</p>
                        </div>

                        <div class="c-feed__item c-feed__item--warning">
                            <p>New order received from Canada by #49832</p>
                            <p class="u-text-xsmall">6 hours ago</p>
                        </div>

                        <div class="c-feed__item">
                            <p>New order received from Canada by #49832</p>
                            <p class="u-text-xsmall">6 hours ago</p>
                        </div>
                    </div><!-- // .c-feed -->

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style scoped>

</style>