import m from 'mithril';

class MemberCtrl {
  constructor(id) {
    this.request(id);
  }

  async request(id) {
    this.data = {
      id: id,
      name: `nyet${id}`,
      mail: `nyet${id}@outlook.jp`,
      organization: `AAA`,
      unit: `XXXXX`,
      groups: [
        {
          fy: 2020,
          items: [
            {
              id: 1,
              name: 'document1',
            },
            {
              id: 2,
              name: 'document2',
            },
          ],
        },
        {
          fy: 2019,
          items: [
            {
              id: 3,
              name: 'document3',
            },
            {
              id: 4,
              name: 'document4',
            },
            {
              id: 5,
              name: 'document5',
            },
          ],
        },
      ],
    };
    m.redraw();
  }
}

export default MemberCtrl;
