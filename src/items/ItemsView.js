import m from "mithril";
import ItemsCtrl from "./ItemsCtrl";
import Searchboxes from "./aside/Searchboxes";
import TableView from "./main/TableView";

class ItemsView {
  constructor() {
    this.ctrl = new ItemsCtrl;
  }

  view() {
    return m(".columns", [
      m("aside", { class: "column is-3" }, m(Searchboxes, this.ctrl)),
      m("main", { class: "column" }, m(TableView, this.ctrl))
    ])
  }
}

export default ItemsView;
