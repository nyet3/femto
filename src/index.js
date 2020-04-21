import './style.scss'
import { dom, library } from '@fortawesome/fontawesome-svg-core';
import {
    faPlus,
    faMinus,
    faCheck,
    faUser,
    faUserPlus,
    faUserEdit,
    faUserMinus,
    faTrashAlt,
    faAddressBook,
    faBuilding,
    faEnvelope,
    faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import m from 'mithril'
import MembersView from './members/MembersView'
import MemberView from './member/MemberView'
import MemberEdit from './member/MemberEdit'
import ItemsView from './items/ItemsView'
import ItemView from './item/ItemView'
import ItemEdit from './item/ItemEdit'


library.add(
    faPlus,
    faMinus,
    faCheck,
    faUser,
    faUserPlus,
    faUserEdit,
    faUserMinus,
    faTrashAlt,
    faAddressBook,
    faAddressBook,
    faBuilding,
    faEnvelope,
    faExclamationTriangle
);
dom.watch();

m.route(document.body, "/members", {
    "/members": MembersView,
    "/members/:id": MemberView,
    "/members/:id/edit": MemberEdit,
    "/items": ItemsView,
    "/items/:id": ItemView,
    "/items/:id/edit": ItemEdit,
})
