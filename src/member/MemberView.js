import m from 'mithril';
import MemberCtrl from './MemberCtrl';

class MemberView {
  constructor({ attrs }) {
    this.id = attrs.id;
    this.ctrl = new MemberCtrl(attrs.id);
  }

  view() {
    return (
      <section class='section'>
        <div class='tile is-ancestor'>
          <div class='tile is-vertical is-3'>
            <div class='field'>
              <label class='label is-size-7'>Name</label>
              <div class='control'>
                <p class='is-size-6'>this.ctrl.data.name</p>
              </div>
            </div>

            <div class='field'>
              <label class='label is-size-7'>Username</label>
              <div class='control'>
                <p class='is-size-6'>"nyet"</p>
              </div>
            </div>

            <div class='field'>
              <label class='label is-size-7'>Email</label>
              <div class='control'>
                <p class='is-size-6'>{this.ctrl.data.mail}</p>
              </div>
            </div>
          </div>
          {m(
            '.tile is-vertical',
            this.ctrl.data.groups.map((group) =>
              m('.tile is-parent', [
                group.items.map((item) =>
                  m('.tile box is-vertical is-child', [
                    m('p', group.fy),
                    m(
                      m.route.Link,
                      { href: `/items/${item.id}` },
                      m('p', item.name)
                    ),
                  ])
                ),
              ])
            )
          )}
        </div>
        <div class='field is-grouped is-grouped-right'>
          <div class='control'>
            <button
              class='button is-link'
              onclick={(event) => this.onSubmit(event)}
            >
              Submit
            </button>
          </div>
          <div class='control'>
            {m(
              m.route.Link,
              { class: 'button is-link is-light', href: '/members' },
              'Cancel'
            )}
          </div>
        </div>
      </section>
    );
  }

  onSubmit(event) {
    console.log(this.ctrl.data);
  }
}

export default MemberView;
