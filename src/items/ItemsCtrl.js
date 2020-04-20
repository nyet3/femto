import m from 'mithril'
const csURL = "https://api-sandbox.cloudsign.jp"

class MembersCtrl {

  constructor() {
    this.data = [];
    this.buffer = [];

    this.position = 0;
    this.size = 100;
    this.max = 0;
    this.step = 5;

    this.access_token = "c499b74c-9fb9-4149-ac5a-0bd52b7251e4";
    this.update();

  }

  update() {
    if (this.max < this.position + this.size)
      this.position = this.position = this.max - this.size;

    if (this.position < 0)
      this.position = 0;

    const rangeTo = this.position + this.size;
    const rangeFrom = this.buffer.length;

    this.request(rangeFrom, rangeTo);
  }

  // curl --header "Authorization: Bearer 5959268e-4393-44b8-81bc-ec4f9f480619" 
  // https://api-sandbox.cloudsign.jp/documents
  async request(rangeFrom, rangeTo) {

    const response = await fetch(`${csURL}/documents`, {
      mode: "cors",
      headers: {
        "Authorization": `Bearer ${this.access_token}`,
        "accept": "application/json"
      }
    })

    const data = await response.json();
    this.max = data.total;

    const next = this.buffer.slice(this.position + this.size);

    this.buffer.splice(this.position);
    Array.prototype.push.apply(this.buffer, data.documents);
    Array.prototype.push.apply(this.buffer, next);

    this.data = this.buffer.slice(this.position, this.position + this.size);
    m.redraw();
  }

  onwheel(event) {
    this.position += Math.floor(event.deltaY / 150.0 * this.step);
    this.update();
  }

  onadditem(event) {
    // POST /items
    this.buffer.push({
      name: `nyet${this.max}`,
      mail: `nyet${this.max}@new.outlook.jp`,
    });
    this.max++;
  }

}

export default MembersCtrl;
