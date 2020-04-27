import m from 'mithril';

class MembersCtrl {
  constructor() {
    this.data = [];
    this.buffer = [];

    this.position = 0;
    this.size = 15;
    this.max = 500;
    this.step = 5;

    this.update();
  }

  update() {
    if (this.max < this.position + this.size)
      this.position = this.position = this.max - this.size;

    if (this.position < 0) this.position = 0;

    const rangeTo = this.position + this.size;
    const rangeFrom = this.buffer.length;

    this.request(rangeFrom, rangeTo);
  }

  async request(rangeFrom, rangeTo) {
    // GET /members
    for (let i = rangeFrom; i < rangeTo; i++) {
      if (this.buffer.length < i || this.buffer[i] != null)
        console.log(`NG: ${i + this.position}(${this.buffer[i].name})`);

      this.buffer[i] = {
        id: i,
        name: `nyet${i}`,
        mail: `nyet${i}@outlook.jp`,
      };
    }

    this.data = this.buffer.slice(this.position, this.position + this.size);
    m.redraw();
  }

  onwheel(event) {
    this.position += Math.floor((event.deltaY / 150.0) * this.step);
    this.update();
  }

  onaddmember(event) {
    // POST /members
    this.buffer.push({
      name: `nyet${this.max}`,
      mail: `nyet${this.max}@new.outlook.jp`,
    });
    this.max++;
  }
}

export default MembersCtrl;
