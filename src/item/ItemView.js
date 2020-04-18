import m from 'mithril'
import ItemCtrl from './ItemCtrl';
import ItemEdit from './ItemEdit'

class ItemView extends ItemEdit {
    constructor(vnode) {
        super(vnode);
        this.readonly = true;
    }

}

export default ItemView;
