import m from 'mithril'

class Menu {
    view() {
        return m("nav", { class: "section" }, [
            m(m.route.Link, { href: "/", class: "button" }, "Home"),
            m(m.route.Link, { href: "/page1", class: "button" }, "Page 1"),
        ])
    }
}
export default Menu;
