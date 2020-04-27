import m from 'mithril';
import MemberCtrl from './MemberCtrl';

class MemberEdit {
  constructor({ attrs }) {
    this.id = attrs.id;
    this.ctrl = new MemberCtrl(attrs.id);
  }

  view() {
    return (
      <section class='section'>
        <div class='field'>
          <label class='label is-size-7'>Name</label>
          <div class='control'>
            <input
              class='input'
              type='text'
              placeholder='Text input'
              value={this.ctrl.data.name}
            />
          </div>
        </div>
        <div class='field'>
          <label class='label is-size-7'>Username</label>
          <div class='control has-icons-left has-icons-right'>
            <input
              class='input'
              type='text'
              placeholder='Text input'
              value='bulma'
            />
            <span class='icon is-small is-left'>
              <i class='fas fa-user'></i>
            </span>
            <span class='icon is-small is-right'>
              <i class='fas fa-check'></i>
            </span>
          </div>
        </div>

        <div class='field'>
          <label class='label is-size-7'>Email</label>
          <div class='control has-icons-left has-icons-right'>
            <input
              class='input'
              type='email'
              placeholder='Email input'
              value={this.ctrl.data.mail}
            />
            <span class='icon is-small is-left'>
              <i class='fas fa-envelope'></i>
            </span>
            <span class='icon is-small is-right'>
              <i class='fas fa-exclamation-triangle'></i>
            </span>
          </div>
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

export default MemberEdit;
