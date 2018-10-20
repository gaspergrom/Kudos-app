<template>
    <div class="container">
        <div class="row flex--center">

            <div class="col-md-5 flex--one">
                <div class="c-card height100 width100">
                    <div class="u-text-center">
                        <div class="c-avatar c-avatar--large u-mb-small u-inline-flex">
                            <img class="c-avatar__img" src="http://via.placeholder.com/72" alt="Avatar">
                        </div>

                        <h5>Johane Doeić</h5>
                        <p>Lead Frontend Developer</p>
                    </div>

                    <span class="c-divider u-mv-small"></span>

                    <span class="c-text--subtitle text-center width100 block">Kudos received from you</span>
                    <p class="u-mb-small u-text-large text-center">2</p>

                    <span class="c-text--subtitle text-center width100 block">Kudos sent to you</span>
                    <p class="u-mb-small u-text-large text-center">10</p>
                </div>
            </div>
            <div class="col-md-7 flex--one">
                <nav class="c-tabs height100 width100">
                    <div class="c-tabs__list nav nav-tabs" id="myTab" role="tablist">
                        <div class="c-tabs__link active">Activity</div>
                    </div>
                    <div class="c-tabs__content tab-content" id="nav-tabContent">
                        <div class="c-tabs__pane active height100" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                            <div class="c-feed">
                                <div class="c-feed__item">
                                    <div class="c-feed__item-content">
                                        <h6 class="u-text-small">Add new payout method</h6>
                                        <p>Added paypal as the default payout method</p>
                                    </div>
                                    <p class="u-text-xsmall">just now</p>
                                </div>

                                <div class="c-feed__item c-feed__item--success">
                                    <div class="c-feed__item-content">
                                        <h6 class="u-text-small">Payment received</h6>
                                        <p>Cha-ching payment received from <a href="#">@client-22</a></p>
                                    </div>
                                    <p class="u-text-xsmall">30 mins ago</p>
                                </div>

                                <div class="c-feed__item">
                                    <div class="c-feed__item-content">
                                        <h6 class="u-text-small">Project Approved</h6>
                                        <p>Added landing page design to finished projects</p>
                                    </div>

                                    <p class="u-text-xsmall">6 hours ago</p>
                                </div>

                                <div class="c-feed__item c-feed__item--fancy">
                                    <div class="c-feed__item-content">
                                        <h6 class="u-text-small">Project Approved</h6>
                                        <p>Moved new charachter design to <a href="#">@adamslandler</a></p>
                                    </div>
                                    <p class="u-text-xsmall">2 Days ago</p>
                                </div>

                                <div class="c-feed__item c-feed__item--danger">
                                    <div class="c-feed__item-content">
                                        <h6 class="u-text-small">Project Approved</h6>
                                        <p>Design was approved by Neat company</p>
                                    </div>
                                    <p class="u-text-xsmall">2 Days ago</p>
                                </div>

                                <div class="c-feed__item c-feed__item--warning">
                                    <div class="c-feed__item-content">
                                        <h6 class="u-text-small">Project Approved</h6>
                                        <p>New order received from Canada by #49832</p>
                                    </div>
                                    <p class="u-text-xsmall">4 Days ago</p>
                                </div>

                                <div class="c-feed__item">
                                    <div class="c-feed__item-content">
                                        <h6 class="u-text-small">Project Approved</h6>
                                        <p>New order received from Canada by #49832</p>
                                    </div>
                                    <p class="u-text-xsmall">5 Days ago</p>
                                </div>
                            </div><!-- // .c-feed -->
                        </div>
                        <div class="c-tabs__pane" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">ducimus quam fuga, vero atque, error laboriosam odio provident eveniet nemo reiciendis non optio, laborum enim ipsum dolorum, voluptatem ducimus quam fuga, vero atque, error laboriosam odio provident eveniet nemo!</div>
                        <div class="c-tabs__pane" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">optio, laborum enim ipsum dolorum, voluptatem ducimus quam fuga, vero atque, error laboriosam odio provident eveniet nemo reicienoptio, laborum enim ipsum dolorum, voluptatem ducimus quam fuga, vero atque, error laboriosam odio provident eveniet nemo reicien</div>
                    </div>
                </nav>
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