import m from 'mithril';
import ItemModel from './ItemModel';

const csURL = 'https://api-sandbox.cloudsign.jp';

class ItemCtrl {
  constructor(id) {
    this.id = id;
    this.data = new ItemModel(id);
    this.origin = {};
    this.access_token = '1adbc846-40be-491d-b1ee-6088ad444e98';

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
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${this.access_token}`,
          Accept: 'application/json',
        },
      });
      const data = await response.json();
      this.data.doc = data;

      if (!Array.isArray(this.data.doc.files)) {
        this.data.doc.files = [];
      }

      this.origin.doc = JSON.parse(JSON.stringify(data));

      m.redraw();
    } catch (e) {
      console.log(e);
    }
  }
  // curl -X GET "https://api-sandbox.cloudsign.jp/documents/01f90z639d89yygdhc7ea2m3hazn2evr/attribute" -H "accept: application/json"
  async GetAttribute() {
    try {
      const response = await fetch(`${csURL}/documents/${this.id}/attribute`, {
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${this.access_token}`,
          Accept: 'application/json',
        },
      });
      const data = await response.json();
      this.data.attr = data;
      this.origin.attr = JSON.parse(JSON.stringify(data));

      m.redraw();
    } catch (e) {
      console.log(e);
    }
  }

  async submit() {
    const promises = [];

    // add new or update an existing document.
    if (this.id == null) {
      await this.PostDocuments();
    } else {
      promises.push(this.PutDocument());
    }

    // add new or update the attribute of the document.
    promises.push(this.PutAttribute());

    // remove existing and removed patricipants.
    if (
      this.origin.doc != null &&
      Array.isArray(this.origin.doc.participants)
    ) {
      const targets = this.origin.doc.participants.slice(1).filter(source => {
        const test = this.data.doc.participants.some(dist => {
          console.log(`test:${dist.id} == ${source.id}`);
          return dist.id == source.id;
        });
        console.log(`result:${test}`);
        return !test;
      });

      console.log(`targets:${targets}`);
      console.log(targets);

      targets.forEach(deleted => {
        promises.push(this.DeletePaticipant(deleted.id));
      });
    }

    // add new and update updated participants.
    this.data.doc.participants.slice(1).forEach(p => {
      if (p.status == null) {
        promises.push(
          this.PostParticipants(
            p.email,
            p.name,
            p.organization,
            p.access_code,
            p.language_code
          )
        );
      } else {
        promises.push(
          this.PutParticipants(
            p.id,
            p.email,
            p.name,
            p.organization,
            p.access_code,
            p.language_code
          )
        );
      }
    });

    const results = await Promise.all(promises);
    console.log(results);

    m.redraw();
  }

  // curl -X POST "https://api.cloudsign.jp/documents"
  //  -H "accept: application/json"
  //  -H "Content-Type: application/x-www-form-urlencoded"
  //  -d "title=title&note=note&message=message&template_id=&can_transfer=false"
  async PostDocuments() {
    const params = new URLSearchParams();
    params.append('title', this.data.doc.title);
    params.append('note', this.data.doc.note);
    params.append('message', this.data.doc.message);
    params.append(
      'can_transfer',
      this.data.doc.can_transfer ? 'true' : 'false'
    );

    const response = await fetch(`${csURL}/documents`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: `Bearer ${this.access_token}`,
      },
      body: params.toString(),
    });
    const data = await response.json();
    console.log(data);

    this.origin.doc = JSON.parse(JSON.stringify(this.data.doc));
    return data;
  }

  // curl -X PUT "https://api.cloudsign.jp/documents/ttt"
  // -H "accept: application/json"
  // -H "Content-Type: application/x-www-form-urlencoded"
  // -d "title=&note=&message=&can_transfer=false"
  async PutDocument() {
    const params = new URLSearchParams();
    params.append('title', this.data.doc.title);
    params.append('note', this.data.doc.note);
    params.append('message', this.data.doc.message);
    params.append(
      'can_transfer',
      this.data.doc.can_transfer ? 'true' : 'false'
    );

    const response = await fetch(`${csURL}/documents/${this.id}`, {
      mode: 'cors',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: `Bearer ${this.access_token}`,
      },
      body: params.toString(),
    });
    const postsData = await response.json();
    console.log(postsData);

    if (!response.ok || response.status != 200) {
      return null;
    }

    this.origin.doc = JSON.parse(JSON.stringify(this.data.doc));
    return postsData;
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
    const data = {};

    const li1 = [
      'title',
      'counterparty',
      'contract_at',
      'validity_start_at',
      'validity_end_at',
      'validity_end_notice_at',
      'auto_update',
      'local_id',
      'amount',
    ];
    li1.forEach(item => {
      if (
        item in this.data.attr &&
        this.data.attr[item] != null &&
        this.data.attr[item] != '' &&
        !Array.isArray(this.data.attr[item])
      ) {
        data[item] = this.data.attr[item];
      }
    });

    data.options = [];

    if (Array.isArray(this.data.attr.options)) {
      this.data.attr.options.forEach((option, index) => {
        data.options.push({
          order: index + 1,
          content: option.content,
        });
      });
    }

    const jsonStr = JSON.stringify(data);
    console.log(jsonStr);
    console.log(data);

    const response = await fetch(`${csURL}/documents/${this.id}/attribute`, {
      mode: 'cors',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.access_token}`,
      },
      body: JSON.stringify(data),
    });

    const postsData = await response.json();
    console.log(postsData);

    if (!response.ok || response.status != 200) {
      return null;
    }

    this.origin.attr = JSON.parse(JSON.stringify(this.data.attr));
    return postsData;
  }
  // curl -X POST "https://api.cloudsign.jp/documents/xxxxxx/participants"
  // -H "accept: application/json"
  // -H "Content-Type: application/x-www-form-urlencoded"
  // -d "email=&name=&organization=&access_code=&language_code=ja"
  async PostParticipants(
    email,
    name,
    organization,
    access_code,
    language_code
  ) {
    const params = new URLSearchParams();
    if (email != '') params.append('email', email);
    if (name != '') params.append('name', name);
    if (organization != '') params.append('organization', organization);
    if (access_code != '') params.append('access_code', access_code);
    params.append('language_code', language_code == '' ? 'ja' : language_code);

    const response = await fetch(`${csURL}/documents/${this.id}/participants`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: `Bearer ${this.access_token}`,
      },
      body: params.toString(),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok || response.status != 200) {
      return null;
    }

    this.data.doc = data;
    this.origin.doc = JSON.parse(JSON.stringify(this.data.doc));

    return data;
  }
  // curl -X PUT "https://api.cloudsign.jp/documents/xxxx/participants/xxxxxx"
  // -H "accept: application/json"
  // -H "Content-Type: application/x-www-form-urlencoded"
  // -d "email=&name=&organization=&access_code=&language_code="
  async PutParticipants(
    id,
    email,
    name,
    organization,
    access_code,
    language_code
  ) {
    const params = new URLSearchParams();
    if (email != '') params.append('email', email);
    if (name != '') params.append('name', name);
    if (organization != '') params.append('organization', organization);
    if (access_code != '') params.append('access_code', access_code);
    params.append('language_code', language_code == '' ? 'ja' : language_code);

    const response = await fetch(
      `${csURL}/documents/${this.id}/participants/${id}`,
      {
        mode: 'cors',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: `Bearer ${this.access_token}`,
        },
        body: params.toString(),
      }
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok || response.status != 200) {
      return null;
    }

    this.origin.doc = JSON.parse(JSON.stringify(this.data.doc));
    return data;
  }

  // curl -X DELETE "https://api.cloudsign.jp/documents/xxxx/participants/xxxx"
  // -H "accept: application/json"
  async DeletePaticipant(id) {
    const response = await fetch(
      `${csURL}/documents/${this.id}/participants/${id}`,
      {
        mode: 'cors',
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.access_token}`,
        },
      }
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok || response.status != 200) {
      return null;
    }

    this.origin.doc = JSON.parse(JSON.stringify(this.data.doc));
    return data;
  }
  // curl -X GET "https://api.cloudsign.jp/documents/x/files/y"
  // -H "accept: application/pdf"
  async GetFile(id) {
    const response = await fetch(`${csURL}/documents/${this.id}/files/${id}`, {
      mode: 'cors',
      method: 'GET',
      headers: {
        Accept: 'accept: application/pdf',
        Authorization: `Bearer ${this.access_token}`,
      },
    });

    const data = await response.blob();
    console.log(data);

    // MS Edge and IE don't allow using a blob object directly as link href, instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(data);
    } else {
      // For other browsers: create a link pointing to the ObjectURL containing the blob.
      const url = window.URL.createObjectURL(data);

      let link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.click();

      // For Firefox it is necessary to delay revoking the ObjectURL.
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 250);
    }
  }
}

export default ItemCtrl;
