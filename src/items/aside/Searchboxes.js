import m from 'mithril'
import bulmaAccordion from 'bulma-accordion'

class Searchboxes {
    construcctor() {

    }
    view() {
        return m(".section", [(
            <section class="accordions">
                <article class="accordion is-success is-active">
                    <div class="accordion-header toggle">
                        <p>Text Search</p>
                    </div>
                    <div class="accordion-body">
                        <div class="accordion-content">
                            <div class="field">
                                <label class="label is-size-7">Name</label>
                                <div class="control has-icons-left">
                                    <input class="input is-success" type="text" placeholder="Text input" value="bulma" />
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Address</label>
                                <div class="control has-icons-left">
                                    <input class="input is-success" type="text" placeholder="Text input" value="tokyo" />
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-address-book"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-size-7">Section</label>
                                <div class="control has-icons-left">
                                    <input class="input is-success" type="text" placeholder="Text input" value="tokyo" />
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-building"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
                <article class="accordion is-success">
                    <div class="accordion-header">
                        <p>Options Search</p>
                        <button class="toggle" aria-label="toggle"></button>
                    </div>
                    <div class="accordion-body">
                        <div class="accordion-content">
                            <div class="control">
                                <label class="radio">
                                    <input type="radio" name="male" />
                                        Mr.
                                </label>
                                <label class="radio">
                                    <input type="radio" name="female" />
                                        Ms.
                                </label>
                                <label class="radio">
                                    <input type="radio" name="both" checked />
                                        both
                                </label>
                            </div>
                        </div>
                    </div>
                </article>
                <article class="accordion is-success">
                    <div class="accordion-header">
                        <p>Checked Item Search</p>
                        <button class="toggle" aria-label="toggle"></button>
                    </div>
                    <div class="accordion-body">
                        <div class="accordion-content">
                            <label class="checkbox">
                                <input type="checkbox" />
                                English
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" />
                                Spanish
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" />
                                Chinese
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" />
                                Japanses
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" />
                               	Hungarian
                            </label>
                        </div>
                    </div>
                </article>
            </section>
        ),
        (
            <nav class="level">
                <div class="level-left"></div>
                <div class="level-right">
                    <p class="level-item">
                        <a >
                            <i class="fas fa-user-plus"></i>
                        </a>
                    </p>
                </div>
            </nav>
        )])
    }
    oncreate() {
        this.accordions = bulmaAccordion.attach();
    }
}

export default Searchboxes;
