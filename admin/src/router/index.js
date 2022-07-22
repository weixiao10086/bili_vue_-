import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Main from '@/views/Main'
import Home from '@/views/Home'
import CoursesList from '@/views/courses/CoursesList'
import EpisodesEdit from '@/views/episodes/EpisodesEdit'
import EpisodesList from '@/views/episodes/EpisodesList'

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Main,
            children: [
                {
                    name: 'home',
                    path: '/',
                    component: Home
                },
                {
                    name: 'course-list',
                    path: '/course/list',
                    component: CoursesList
                },
                {
                    name: 'episodes-edit',
                    path: '/episodes/edit/:id',
                    component: EpisodesEdit,
                    //传给页面的路由参数的id
                    props:true
                },
                {
                    name: 'episodes-create',
                    path: '/episodes/create',
                    component: EpisodesEdit
                },
                {
                    name: 'episodes-list',
                    path: '/episodes/list',
                    component: EpisodesList
                },
            ]
        }
    ]
})