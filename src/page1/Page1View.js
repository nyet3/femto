import m from 'mithril'
import Menu from '../menu'

class Page1View {
    view() {
        return m(".section",[
            m(Menu), // MenuをHomeと共有している。
            m("h1", { class: "title" }, "Page 1")
    ])}
}
export default Page1View;

