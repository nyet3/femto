import m from 'mithril'
import Menu from '../menu'

class HomeView {
    view() {
        return m(".section",[
            m(Menu), // MenuをPageと共有している。
            m("h1", { class: "title" }, "Home!")
    ])}
}
export default HomeView;
