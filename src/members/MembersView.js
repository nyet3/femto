import m from "mithril";
import MembersCtrl from "./MembersCtrl";
import TableView from "./main/TableView";

class MembersView {
  constructor({ attrs }) {
    this.ctrl = new MembersCtrl(attrs.id);
  }

  view() {
    return m(TableView, this.ctrl);
  }
}

export default MembersView;
