import m from "mithril";
import ItemCtrl from './ItemCtrl'
class ItemEdit {
    constructor({ attrs }) {
        this.ctrl = new ItemCtrl(attrs.id);
        this.readonly = false;
    }

    view() {
        const z = new Date(Date.parse(this.ctrl.data.doc.created_at)).getTimezoneOffset() * 60 * 1000;
        return (
            <section class="section">
                <div class="tile is-ancester is-vertical">
                    <div class="field">
                        <label class="label is-size-7">契約書管理ID</label>
                        <div class="control">
                            <input class="input attr" type="text" name="local_id" disabled={this.readonly} value={this.ctrl.data.attr.local_id} />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">書類のタイトル</label>
                        <div class="control">
                            <input class="input doc" type="text" name="title" placeholder="Text input" disabled={this.readonly} value={this.ctrl.data.doc.title} />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">契約相手</label>
                        <div class="control">
                            <input class="input attr" type="text" name="counterparty" placeholder="Text input" disabled={this.readonly} value={this.ctrl.data.attr.counterparty} />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">金額</label>
                        <div class="control">
                            <input class="input attr numdata" type="text" name="amount" placeholder="Number input" disabled={this.readonly} value={addFigure(String(this.ctrl.data.attr.amount))} />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">書類の状態</label>
                        <div class="control">
                            <div class="select">
                                <select>
                                    <option disabled={this.ctrl.data.doc.status != 0 ? true : false}>下書き</option>
                                    <option disabled={this.ctrl.data.doc.status != 1 ? true : false}>先方確認中</option>
                                    <option disabled={this.ctrl.data.doc.status != 2 ? true : false}>締結済</option>
                                    <option disabled={this.ctrl.data.doc.status != 3 ? true : false}>取消、または却下</option>
                                    <option disabled={this.ctrl.data.doc.status != 4 ? true : false}>テンプレート</option>
                                    <option disabled={this.ctrl.data.doc.status != 13 ? true : false}>インポート書類</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">非公開メモ</label>
                        <div class="control">
                            <textarea class="textarea doc" name="note" rows="5" disabled={this.readonly} style="width:100%">{this.ctrl.data.doc.note}</textarea>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">メール受信者に対するメッセージ</label>
                        <div class="control">
                            <textarea class="textarea doc" name="message" rows="5" disabled={this.readonly} style="width:100%">{this.ctrl.data.doc.message}</textarea>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">契約締結日</label>
                        <div class="control">
                            <input class="input attr" type="date" name="contract_at" disabled={this.readonly} value={this.ctrl.data.attr.contract_at} />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">契約開始日</label>
                        <div class="control">
                            <input class="input attr" type="date" name="validity_start_at" disabled={this.readonly} value={this.ctrl.data.attr.validity_start_at} />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">契約終了日</label>
                        <div class="control">
                            <input class="input attr" type="date" name="validity_end_at" disabled={this.readonly} value={this.ctrl.data.attr.validity_end_at} />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">解約通知期限</label>
                        <div class="control">
                            <input class="input attr" type="date" name="validity_end_notice_at" disabled={this.readonly} value={this.ctrl.data.attr.validity_end_notice_at} />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">契約の自動更新</label>
                        <div class="control">
                            <div class="select">
                                <select class="attr" name="auto_update">
                                    <option value="0" selected={this.ctrl.data.attr.auto_update == 0 ? true : false}>指定なし</option>
                                    <option value="1" selected={this.ctrl.data.attr.auto_update == 1 ? true : false}>あり</option>
                                    <option value="2" selected={this.ctrl.data.attr.auto_update == 2 ? true : false}>なし</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {
                        m(".tile is-parent is-vertical",
                            this.ctrl.data.doc.participants.map(
                                (participant, index) => (
                                    <div class="tile box is-child is-vertical">

                                        <div class="field">
                                            <label class="label is-size-7">名前</label>
                                            <div class="control">
                                                <input
                                                    class="input"
                                                    type="text"
                                                    disabled={this.readonly || index == 0}
                                                    name="name"
                                                    value={participant.name}
                                                    onchange={event => this.onchange(event, participant)} />
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label is-size-7">組織</label>
                                            <div class="control">
                                                <input
                                                    class="input"
                                                    type="text"
                                                    disabled={this.readonly || index == 0}
                                                    name="organization"
                                                    value={participant.organization}
                                                    onchange={event => this.onchange(event, participant)} />
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label is-size-7">E-Mail</label>
                                            <div class="control">
                                                <input
                                                    class="input"
                                                    type="text"
                                                    disabled={this.readonly || index == 0}
                                                    name="email"
                                                    value={participant.email}
                                                    onchange={event => this.onchange(event, participant)} />
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label is-size-7">アクセスコード</label>
                                            <div class="control">
                                                <input
                                                    class="input"
                                                    type="text"
                                                    disabled={this.readonly || index == 0}
                                                    name="access_code"
                                                    value={participant.access_code}
                                                    onchange={event => this.onchange(event, participant)} />
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label is-size-7">言語</label>
                                            <div class="control">
                                                <div class="select">
                                                    <select
                                                        class="participant"
                                                        name="language_code"
                                                        onchange={event => this.onchange(event, participant)} >
                                                        <option value="ja" selected={participant.language_code == "ja" ? true : false}>日本語</option>
                                                        <option value="en" selected={participant.language_code == "en" ? true : false}>English</option>
                                                        <option value="zh-CHS" selected={participant.language_code == "zh-CHS" ? true : false}>簡体字</option>
                                                        <option value="zh-CHT" selected={participant.language_code == "zh-CHT" ? true : false}>繁体字</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label is-size-7">E-Mailの状態</label>
                                            <div class="control">
                                                <div class="select">
                                                    <select>
                                                        <option disabled={participant.status != 0 ? true : false}>アクセス不可</option>
                                                        <option disabled={participant.status != 2 ? true : false}>下書き</option>
                                                        <option disabled={participant.status != 3 ? true : false}>配信待ち</option>
                                                        <option disabled={participant.status != 4 ? true : false}>確認待ち</option>
                                                        <option disabled={participant.status != 6 ? true : false}>送信済み</option>
                                                        <option disabled={participant.status != 7 ? true : false}>確認済み</option>
                                                        <option disabled={participant.status != 8 ? true : false}>押印または入力済み</option>
                                                        <option disabled={participant.status != 9 ? true : false}>却下</option>
                                                        <option disabled={participant.status != 10 ? true : false}>キャンセル</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label is-size-7">宛先ID</label>
                                            <div class="control">
                                                <input class="input" type="text" disabled value={participant.id} />
                                            </div>
                                        </div>

                                        <div class="field is-grouped is-grouped-right">
                                            <p class="control">
                                                <p class="buttons">
                                                    <button class="button" data-tooltip="追加" disabled={this.readonly}
                                                        onclick={event => this.onClickAddParticipant(event)}>
                                                        <span class="icon is-small">
                                                            <i class="fas fa-user-plus"></i>
                                                        </span>
                                                    </button>
                                                    <button class="button" data-tooltip="除外" disabled={this.readonly || index == 0}
                                                        onclick={event => this.onClickRemoveParticipant(event, index)}>
                                                        <span class="icon is-small">
                                                            <i class="fas fa-user-minus"></i>
                                                        </span>
                                                    </button>
                                                </p>
                                            </p>
                                        </div>

                                    </div>
                                )
                            )
                        )
                    }

                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox" checked={this.ctrl.data.doc.can_transfer} />
                            転送許可
                        </label>
                        </div>
                    </div>

                    {
                        this.ctrl.data.attr.options.map(
                            item => (
                                <div class="field">
                                    <label class="label is-size-7">管理項目{item.order}</label>
                                    <div class="control">
                                        <input class="input" type="text" disabled={this.readonly} value={item.content} />
                                    </div>
                                </div>
                            )
                        )
                    }
                    <div class="field is-grouped is-grouped-right">
                        <p class="control">
                            <p class="buttons">
                                <button class="button" data-tooltip="追加"
                                    disabled={this.readonly ||
                                        (this.ctrl.data.attr.options != null && this.ctrl.data.attr.options.length > 8)}
                                    onclick={event => this.onClickAddOptions(event)}>
                                    <span class="icon is-small">
                                        <i class="fas fa-plus"></i>
                                    </span>
                                </button>
                                <button class="button" data-tooltip="削除"
                                    disabled={this.readonly ||
                                        this.ctrl.data.attr.options == null ||
                                        (this.ctrl.data.attr.options != null && this.ctrl.data.attr.options.length < 1)}
                                    onclick={event => this.onClickDeleteOptions(event)}>
                                    <span class="icon is-small">
                                        <i class="fas fa-minus"></i>
                                    </span>
                                </button>
                            </p>
                        </p>
                    </div>

                    <hr />

                    <div class="field">
                        <label class="label is-size-7">契約の送信日時</label>
                        <div class="control">
                            <input class="input" type="datetime-local" disabled value={
                                new Date(Date.parse(this.ctrl.data.doc.created_at) - z).toISOString().split('.')[0]
                            } />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">契約の最終更新日時</label>
                        <div class="control">
                            <input class="input" type="datetime-local" disabled value={
                                new Date(Date.parse(this.ctrl.data.doc.last_processed_at) - z).toISOString().split('.')[0]
                            } />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">書類ID</label>
                        <div class="control">
                            <input class="input" type="text" disabled value={this.ctrl.data.doc.id} />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">最終更新日時</label>
                        <div class="control">
                            <input class="input" type="datetime-local" disabled value={
                                new Date(Date.parse(this.ctrl.data.doc.updated_at) - z).toISOString().split('.')[0]
                            } />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">作成日時</label>
                        <div class="control">
                            <input class="input" type="datetime-local" disabled value={
                                new Date(Date.parse(this.ctrl.data.doc.created_at) - z).toISOString().split('.')[0]
                            } />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">作成者ID</label>
                        <div class="control">
                            <input class="input" type="text" disabled value={this.ctrl.data.doc.user_id} />
                        </div>
                    </div>

                    <div class="field is-grouped is-grouped-right">
                        <div class="control">
                            <button class="button is-link" disabled={this.readonly} onclick={event => this.onSubmit(event)}>更新</button>
                        </div>
                        <div class="control">
                            {m(m.route.Link, { class: "button is-link is-light", href: "/items" }, "戻る")}
                        </div>
                    </div>
                </div>
            </section >
        )
    }
    oncreate({ dom }) {
        Array.from(document.getElementsByClassName('numdata')).forEach(elm => {
            elm.addEventListener('blur', event => event.target.value = addFigure(event.target.value));
            elm.addEventListener('focus', event => event.target.value = delFigure(event.target.value));
        });
        Array.from(document.getElementsByClassName('doc')).forEach(elm => {
            elm.addEventListener('change', event => this.onchange(event, this.ctrl.origin.doc));
        });
        Array.from(document.getElementsByClassName('attr')).forEach(elm => {
            elm.addEventListener('change', event => this.onchange(event, this.ctrl.origin.attr));
        });
    }

    onSubmit(event) {
        this.ctrl.submit();
    }

    onchange(event, data) {
        if (!Array.from(event.target.classList).includes("is-danger")) {
            if (event.target.value != data[event.target.name]) {
                event.target.classList.add("is-danger");
            }
        } else {
            if (event.target.value == data[event.target.name]) {
                event.target.classList.remove("is-danger");
            }
        }

        data[event.target.name] = event.target.value;
    }

    onClickAddParticipant(event) {
        this.ctrl.data.doc.participants.push({
            email: "", // 宛先のメールアドレス
            name: "", // 宛先の名前
            organization: "", // 宛先の会社名
            access_code: "", // 宛先に設定されているアクセスコード。APIを使用しているユーザーが値を設定した場合のみレスポンスに含まれる。
            language_code: "",// 宛先の言語設定。ja（日本語）、en（英語）、zh-CHS（簡体字）、zh-CHT（繁体字）のいずれか。
        })
        m.redraw();
    }

    onClickRemoveParticipant(event, index) {
        this.ctrl.data.doc.participants.splice(index, 1);
    }

    onClickAddOptions(event) {
        const n = this.ctrl.data.attr.options.length;
        this.ctrl.data.attr.options.push({
            order: n + 1,
            content: ""
        });
        m.redraw();
    }

    onClickDeleteOptions(event) {
        this.ctrl.data.attr.options.pop();
        m.redraw();
    }
}

export default ItemEdit;

// https://webllica.com/add-comma-as-thousands-separator/

/**
 * 数値の3桁カンマ区切り
 * 入力値をカンマ区切りにして返却
 * [引数]   numVal: 入力数値
 * [返却値] String(): カンマ区切りされた文字列
 */
function addFigure(numVal) {
    // 空の場合そのまま返却
    if (numVal == '') {
        return '';
    }
    // 全角から半角へ変換し、既にカンマが入力されていたら事前に削除
    numVal = toHalfWidth(numVal).replace(/,/g, "").trim();
    // 数値でなければそのまま返却
    if (!/^[+|-]?(\d*)(\.\d+)?$/.test(numVal)) {
        return numVal;
    }
    // 整数部分と小数部分に分割
    var numData = numVal.toString().split('.');
    // 整数部分を3桁カンマ区切りへ
    numData[0] = Number(numData[0]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // 小数部分と結合して返却
    return numData.join('.');
}

/**
 * カンマ外し
 * 入力値のカンマを取り除いて返却
 * [引数]   strVal: 半角でカンマ区切りされた数値
 * [返却値] String(): カンマを削除した数値
 */
function delFigure(strVal) {
    return strVal.replace(/,/g, "");
}

/**
 * 全角から半角への変革関数
 * 入力値の英数記号を半角変換して返却
 * [引数]   strVal: 入力値
 * [返却値] String(): 半角変換された文字列
 */
function toHalfWidth(strVal) {
    // 半角変換
    var halfVal = strVal.replace(/[！-～]/g,
        function (tmpStr) {
            // 文字コードをシフト
            return String.fromCharCode(tmpStr.charCodeAt(0) - 0xFEE0);
        }
    );
    return halfVal;
}

/**
 * 処理を適用するテキストボックスへのイベント設定
 * onBlur : カンマ区切り処理実施
 * onFocus : カンマ削除処理実施
 */
// const elm = document.getElementById('numdata');
// elm.addEventListener('blur', function () { this.value = addFigure(this.value) }, false);
// elm.addEventListener('focus', function () { this.value = delFigure(this.value) }, false);