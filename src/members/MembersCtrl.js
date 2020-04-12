class MembersCtrl {
  constructor({ attrs }) {
    this.data = [];

    this.position = 0;
    this.size = 15;

    this.request();
  }

  request() {
    for (let i = 0; i < this.size; i++) {
      this.data[i] = {
        name: `nyet${this.position + i}`,
        mail: `nyet${this.position + i}@outlook.jp`,
      };
    }
  }
}

export default MembersCtrl;
