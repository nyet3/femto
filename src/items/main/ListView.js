import m from 'mithril'

class ListViwe {
    constructor({ attrs }) {
        this.ctrl = attrs;
    }

    view() {
        return m(".section",
            this.ctrl.buffer.map(
                item => m("article", { class: "media" }, [
                    m("figure", { class: "media-left" },
                        m("p", { class: "image is-64x64" },
                            m("img", { src: "https://bulma.io/images/placeholders/128x128.png" })
                        )
                    ),
                    m(".media-content", [
                        m(".columns", [
                            m(".column is-1", m("p", { class: "is-size-7" }, "name")),
                            m(".column is-1",
                                m(m.route.Link,
                                    { class: "level-item", href: `members/${item.id}` },
                                    item.name)
                            ),
                            m(".column is-1", m("p", { class: "is-size-7" }, "mail")),
                            m(".column is-1", item.mail),
                        ]),
                        m(".columns",
                            m(".column is-1", [
                                m(m.route.Link,
                                    { class: "level-item", href: `members/${item.id}/edit` },
                                    m("span", { class: "icon is-small" }, m("i", { class: "fas fa-user-edit" }))
                                )
                            ])
                        )
                    ]),
                    m(".media-right",
                        m("button", { class: "delete" })
                    )
                ])
            )
        )
    }
    oncreate({ dom }) {
        document.addEventListener("scroll", event => this.onscroll(event));
    }
    onscroll(event) {
        const bottom = document.body.scrollTop + document.body.clientHeight - document.documentElement.clientHeight;
        if (window.scrollY / bottom < 0.95)
            return;

        this.ctrl.position = this.ctrl.buffer.length;
        this.ctrl.update();
    }
}

export default ListViwe;
