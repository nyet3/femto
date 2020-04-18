import m from "mithril";

class TableView {
  constructor({ attrs }) {
    this.ctrl = attrs;
  }

  view() {
    return m(
      "table",
      {
        class: "table is-striped is-narrow is-hoverable is-fullwidth",
      },
      [
        m("thead",
          m("tr", [
            m("th", "#"),
            m("th", "name"),
            m("th", "email")
          ])
        ),
        m(
          "tfoot",
          m(
            "button",
            { id: "cmdAddItem", class: "button" },
            m(
              "span",
              { class: "icon is-success is-small" },
              m("i", { class: "fas fa-plus-square" })
            )
          )
        ),
        m(
          "tbody",
          this.ctrl.data.map((item, index) =>
            m("tr", [
              m("td", m(m.route.Link, { href: `items/${item.id}/edit` }, index + this.ctrl.position)),
              m("td", item.can_transfer),
              m("td", item.created_at),
              m("td", item.id),
              m("td", item.last_processed_at),
              m("td", item.message),
              m("td", item.note),
              m("td", item.participants.map(
                participant => m("p", participant.id + participant.email + participant.name + participant.organization + participant.order)
              )),
              m("td", item.sent_at),
              m("td", item.status),
              m("td", item.title),
              m("td", item.updated_at),
              m("td", item.user_id)
            ])
          )
        ),
      ]
    );
  }

  oncreate({ dom }) {
    const cmd = document.getElementById("cmdAddItem");
    cmd.addEventListener("click", event => this.ctrl.onadditem(event));
    dom.addEventListener("wheel", event => this.onwheel(event));
  }

  onwheel(event) {
    this.ctrl.position += Math.floor(event.deltaY / 150.0 * this.ctrl.step);
    this.ctrl.update();
  }
}

export default TableView;
