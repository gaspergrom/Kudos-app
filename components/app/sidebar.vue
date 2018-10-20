<template>
    <aside class="c-sidebar">
        <div class="c-sidebar__brand">
            <img src="/logo.png" style="height: 50px;margin-left: -15px;">
        </div>

        <!-- Scrollable -->
        <div class="c-sidebar__body">
            <span class="c-sidebar__title">Main</span>
            <ul class="c-sidebar__list">
                <li>
                    <nuxt-link class="c-sidebar__link" to="/" active-class="is-active" exact>
                        <i class="c-sidebar__icon feather icon-home"></i>Dashboard
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link class="c-sidebar__link" to="/activity" active-class="is-active" exact>
                        <i class="c-sidebar__icon feather icon-trending-up"></i>Activity
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link class="c-sidebar__link" to="/tasks" active-class="is-active" exact>
                        <i class="c-sidebar__icon feather icon-tag"></i>Tasks
                    </nuxt-link>
                </li>
                <li class="c-sidebar__item has-submenu">
                    <a class="c-sidebar__link" @click="statistics=!statistics">
                        <i class="c-sidebar__icon feather icon-bar-chart-2"></i>Statistics
                    </a>
                    <ul class="c-sidebar__list " :class="{'collapse': statistics}">
                        <li><nuxt-link to="/statistics" class="c-sidebar__link" href="#">Overview</nuxt-link></li>
                        <li><a class="c-sidebar__link" href="#">Kudos</a></li>
                        <li><a class="c-sidebar__link" href="#">Tasks</a></li>
                    </ul>
                </li>
                <li>
                    <nuxt-link class="c-sidebar__link" to="/shop" active-class="is-active" exact>
                        <i class="c-sidebar__icon feather icon-shopping-cart"></i>Gift shop
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link class="c-sidebar__link" to="/shop/redeems" active-class="is-active" exact>
                        <i class="c-sidebar__icon feather icon-credit-card"></i>Redeems
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link class="c-sidebar__link" to="/maketeam" active-class="is-active" exact>
                        <i class="c-sidebar__icon feather icon-users"></i>Make team
                    </nuxt-link>
                </li>
            </ul>
            <span class="c-sidebar__title">{{$store.state.companies.name}}</span>
            <ul class="c-sidebar__list">
                <li>
                    <nuxt-link class="c-sidebar__link" :to="`/company`" active-class="is-active" exact>
                        <i class="c-sidebar__icon feather icon-users"></i>All members
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link class="c-sidebar__link" :to="`/company/department`" active-class="is-active"
                               exact>
                        <i class="c-sidebar__icon feather icon-bookmark"></i>Departments
                    </nuxt-link>
                </li>
                <li v-for="department of $store.state.companies.departments">
                    <nuxt-link class="c-sidebar__link" :to="`/company/department/${department._id}`"
                               active-class="is-active" exact>
                        <i class="c-sidebar__icon feather icon-user"></i>{{department.title}}
                    </nuxt-link>
                </li>

            </ul>
        </div>

        <div class="c-sidebar__footer">
            {{$store.state.user.availableKudos}} kudos
        </div>
    </aside>
</template>

<script>
    export default {
        name: "app-sidebar",
        data: function () {
            return {
                statistics: false,
            }
        }
    }
</script>

<style scoped>

</style>