import './style.scss'
import m from 'mithril'
import MembersView from './members/MembersView'

m.route(document.body, "/members/1", {
    "/members/:id": MembersView
})
