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
        m("thead", m("tr", [m("th", "#"), m("th", "name"), m("th", "email")])),
        m(
          "tfoot",
          m(
            "button",
            { class: "button" },
            m(
              "span",
              { class: "icon is-small" },
              m("i", { class: "fas fa-plus-square" })
            )
          )
        ),
        m(
          "tbody",
          this.ctrl.data.map((item, index) =>
            m("tr", [
              m("td", index + this.ctrl.position),
              m("td", item.name),
              m("td", item.mail),
            ])
          )
        ),
      ]
    );
  }

  oncreate({dom}){
    dom.addEventListener("wheel",event=>this.onwheel);
  }

  onwheel(event){
    console.log(event);
  }

}

export default TableView;
