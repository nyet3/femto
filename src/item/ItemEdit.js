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
                            <input class="input" type="text" disabled={this.readonly} value={this.ctrl.data.attr.local_id} />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">書類のタイトル</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Text input" disabled={this.readonly} value={this.ctrl.data.doc.title} />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">契約相手</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Text input" disabled={this.readonly} value={this.ctrl.data.attr.counterparty} />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">金額</label>
                        <div class="control">
                            <input class="input numdata" type="text" placeholder="Number input" disabled={this.readonly} value={addFigure(String(this.ctrl.data.attr.amount))} />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">書類の状態</label>
                        <div class="control">
                            <div class="select">
                                <select>
                                    <option>書類の状態</option>
                                    <option>下書き</option>
                                    <option>先方確認中</option>
                                    <option>締結済</option>
                                    <option>取消、または却下</option>
                                    <option>テンプレート</option>
                                    <option>インポート書類</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">非公開メモ</label>
                        <div class="control">
                            <textarea class="textarea" rows="5" disabled={this.readonly} style="width:100%">{this.ctrl.data.doc.note}</textarea>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">メール受信者に対するメッセージ</label>
                        <div class="control">
                            <textarea class="textarea" rows="5" disabled={this.readonly} style="width:100%">{this.ctrl.data.doc.message}</textarea>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">契約締結日</label>
                        <div class="control">
                            <input class="input" type="date" disabled={this.readonly} value={this.ctrl.data.attr.contract_at} />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">契約開始日</label>
                        <div class="control">
                            <input class="input" type="date" disabled={this.readonly} value={this.ctrl.data.attr.validity_start_at} />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">契約終了日</label>
                        <div class="control">
                            <input class="input" type="date" disabled={this.readonly} value={this.ctrl.data.attr.validity_end_at} />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label is-size-7">解約通知期限</label>
                        <div class="control">
                            <input class="input" type="date" disabled={this.readonly} value={this.ctrl.data.attr.validity_end_notice_at} />
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox" />
                            契約の自動更新
                        </label>
                        </div>
                    </div>

                    {
                        m(".tile is-parent is-vertical",
                            this.ctrl.data.doc.participants.map(
                                participant => (
                                    <div class="tile box is-child is-vertical">

                                        <div class="field">
                                            <label class="label is-size-7">宛先ID</label>
                                            <div class="control">
                                                <input class="input" type="text" disabled={this.readonly} value={participant.id} />
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label is-size-7">宛先組織</label>
                                            <div class="control">
                                                <input class="input" type="text" disabled={this.readonly} value={participant.organization} />
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label is-size-7">宛先</label>
                                            <div class="control">
                                                <input class="input" type="text" disabled={this.readonly} value={participant.name} />
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label is-size-7">E-Mail</label>
                                            <div class="control">
                                                <input class="input" type="text" disabled={this.readonly} value={participant.email} />
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label is-size-7">アクセスコード</label>
                                            <div class="control">
                                                <input class="input" type="text" disabled={this.readonly} value={participant.access_code} />
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label is-size-7">E-Mailの状態</label>
                                            <div class="control">
                                                <input class="input" type="text" disabled={this.readonly} value={participant.status} />
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label is-size-7">言語</label>
                                            <div class="control">
                                                <input class="input" type="text" disabled={this.readonly} value={participant.language_code} />
                                            </div>
                                        </div>

                                    </div>
                                )
                            )
                        )
                    }

                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox" />
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
            </section>
        )
    }
    oncreate({ dom }) {
        const elms = document.getElementsByClassName('numdata');
        Array.from(elms).forEach(elm => {
            elm.addEventListener('blur', event => event.target.value = addFigure(event.target.value));
            elm.addEventListener('focus', event => event.target.value = delFigure(event.target.value));
        });
    }
    onSubmit(event) {
        console.log(this.ctrl.data);
        this.ctrl.submit();
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