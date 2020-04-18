import m from 'mithril'
import ItemModel from './ItemModel'

const csURL = "https://api-sandbox.cloudsign.jp"

class ItemCtrl {
    constructor(id) {
        this.id = id;
        this.data = new ItemModel(id);
        this.access_token = "47d3f163-69fa-44a2-8c39-c8aa6ac12084";

        if (id != null) {
            this.GetDocuments();
            this.GetAttribute();
        }

    }
    // curl --header "Authorization: Bearer 5959268e-4393-44b8-81bc-ec4f9f480619" 
    // https://api-sandbox.cloudsign.jp/documents
    async GetDocuments() {
        try {

            const response = await fetch(`${csURL}/documents/${this.id}`, {
                mode: "cors",
                headers: {
                    "Authorization": `Bearer ${this.access_token}`,
                    "accept": "application/json"
                }
            })
            const data = await response.json();
            this.data.doc = data;

            m.redraw();
        }
        catch (e) {
            console.log(e);
        }
    }
    // curl -X GET "https://api-sandbox.cloudsign.jp/documents/01f90z639d89yygdhc7ea2m3hazn2evr/attribute" -H "accept: application/json"
    async GetAttribute() {
        try {

            const response = await fetch(`${csURL}/documents/${this.id}/attribute`, {
                mode: "cors",
                headers: {
                    "Authorization": `Bearer ${this.access_token}`,
                    "accept": "application/json"
                }
            })
            const data = await response.json();
            this.data.attr = data;

            m.redraw();
        }
        catch (e) {
            console.log(e);
        }
    }

    submit() {
        if (this.id == null) {
            this.PostDocuments();
            return;
        }
        this.PutDocument();
        this.PutAttribute();
    }

    // curl -X POST "https://api.cloudsign.jp/documents" 
    //  -H "accept: application/json" 
    //  -H "Content-Type: application/x-www-form-urlencoded" 
    //  -d "title=title&note=note&message=message&template_id=&can_transfer=false"
    async PostDocuments() {
        const response = await fetch(`${csURL}/documents`, {
            mode: "cors",
            method: "POST",
            headers: {
                "accept": "application/x-www-form-urlencoded",
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${this.access_token}`
            },
            body: `title=${this.data.title}&note=${this.data.note}&message=${this.data.message}&can_transfer=${this.data.can_transfer}`
        });
        const postsData = await response.json();
        console.log(postsData);
    }

    // curl -X PUT "https://api.cloudsign.jp/documents/ttt"
    // -H "accept: application/json"
    // -H "Content-Type: application/x-www-form-urlencoded"
    // -d "title=&note=&message=&can_transfer=false"
    async PutDocument() {

        const response = await fetch(`${csURL}/documents/${this.id}`, {
            mode: "cors",
            method: "PUT",
            headers: {
                "accept": "application/x-www-form-urlencoded",
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${this.access_token}`
            },
            body: `title=${this.data.title}&note=${this.data.note}&message=${this.data.message}&can_transfer=${this.data.can_transfer}`
        });
        const postsData = await response.json();
        console.log(postsData);
    }

    // curl -X PUT "https://api.cloudsign.jp/documents/xxxxx/attribute"
    // -H "accept: application/json"
    // -H "Content-Type: application/json"
    // -d "{
    //    'title':'string',
    //    'counterparty':'string',
    //    'contract_at':'2020-04-18',
    //    'validity_start_at':'2020-04-18',
    //    'validity_end_at':'2020-04-18',
    //    'validity_end_notice_at':'2020-04-18',
    //    'auto_update':0,
    //    'local_id':'string',
    //    'amount':0,
    //    'options':[{'order':1,'content':'string'}]}"
    async PutAttribute() {
        const response = await fetch(`${csURL}/documents/${this.id}/attribute`, {
            mode: "cors",
            method: "PUT",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.access_token}`,
                "body": `${this.data.attr}`
            },
        });
        const postsData = await response.json();
        console.log(postsData);
    }
}

export default ItemCtrl;
