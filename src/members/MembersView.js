import m from "mithril";
import MembersCtrl from "./MembersCtrl";
import ListView from "./main/ListView";
import Searchboxes from "./aside/Searchboxes";

class MembersView {
  constructor() {
    this.ctrl = new MembersCtrl;
  }

  view() {
    return m(".columns", [
      m("aside", { class: "column is-3", style: "position: fixed" }, m(Searchboxes, this.ctrl)),
      m("main", { class: "column is-offset-3 is-9" }, m(ListView, this.ctrl)),
    ])
  }
}

export default MembersView;
