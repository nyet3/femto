import './style.scss'
import m from 'mithril'
import HomeView from './home/HomeView'
import Page1View from './page1/Page1View'

m.route(document.body, "/", {
    "/": HomeView,
    "/page1": Page1View,
})
