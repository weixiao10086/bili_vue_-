import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Main from '@/views/Main'
import Home from '@/views/Home'
import CoursesList from '@/views/courses/CoursesList'
import CoursesEdit from '@/views/courses/CoursesEdit'
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
                    name: 'course-edit',
                    path: '/course/edit/:id',
                    component: CoursesEdit,
                    //传给页面的路由参数的id
                    props:true
                },
                {
                    name: 'courses-create',
                    path: '/courses/create',
                    component: CoursesEdit
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