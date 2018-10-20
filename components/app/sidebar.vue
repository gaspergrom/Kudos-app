<template>
    <aside class="c-sidebar">
        <div class="c-sidebar__brand">
            Kudos
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
                <li>
                    <nuxt-link class="c-sidebar__link" to="/shop" active-class="is-active" exact>
                        <i class="c-sidebar__icon feather icon-shopping-cart"></i>Gift shop
                    </nuxt-link>
                </li>
            </ul>
            <span class="c-sidebar__title">{{$store.state.companies.name}}</span>
            <ul class="c-sidebar__list">
                <li>
                    <nuxt-link class="c-sidebar__link" :to="`/company/${$store.state.companies.slug}`" active-class="is-active" exact>
                        <i class="c-sidebar__icon feather icon-users"></i>All members
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link class="c-sidebar__link" :to="`/company/${$store.state.companies.name}/department`" active-class="is-active"
                               exact>
                        <i class="c-sidebar__icon feather icon-bookmark"></i>Departments
                    </nuxt-link>
                </li>
                <li v-for="(department, slug) of $store.state.companies.departments">
                    <nuxt-link class="c-sidebar__link" :to="`/company/${$store.state.companies.name}/department/${department.slug}`"
                               active-class="is-active" exact>
                        <i class="c-sidebar__icon feather icon-user"></i>{{department.name}}
                    </nuxt-link>
                </li>

            </ul>
        </div>

        <div class="c-sidebar__footer">
            {{$store.state.user.avaliableKudos}} kudos
        </div>
    </aside>
</template>

<script>
    export default {
        name: "app-sidebar"
    }
</script>

<style scoped>

</style>