// https://app.swaggerhub.com/apis/CloudSign/cloudsign-web_api/0.11.0#/documentModel

class ItemModel {
  constructor(id) {
    const now = new Date();

    // documentModel
    this.doc = {
      id: id,
      user_id: 'nyet',
      title: 'Lorem ipsum',
      note:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia libero a pharetra bibendum. Cras interdum ultricies dictum. Duis vitae imperdiet ex. Fusce sit amet congue ipsum. Nullam eget risus non est fringilla cursus id sed velit. Etiam ornare auctor nulla. Cras condimentum dignissim odio sit amet cursus. Quisque suscipit id nisi vel varius. Suspendisse vulputate est eget dolor dignissim molestie.',
      message:
        'Vivamus libero magna, rhoncus porta tellus euismod, accumsan rutrum mauris. Sed malesuada libero nulla, a tincidunt ipsum sollicitudin ut. Praesent vehicula ut elit quis dignissim. Vivamus lacus nunc, placerat eu malesuada quis, varius vitae mi. Suspendisse aliquam quam eget lacus imperdiet placerat. Sed ac ligula imperdiet, ultricies libero vitae, ultricies eros. Praesent eu eleifend risus. Cras quis lorem massa. Morbi nec vehicula leo, vitae viverra est. Nulla ullamcorper cursus finibus. Quisque tempus odio enim, cursus imperdiet purus tempus non. Integer non tristique massa. Sed faucibus dictum ligula et posuere. Proin et efficitur odio.',
      status: 1, // int64 (0 - draft)
      can_transfer: true,
      sent_at: now.toISOString(), // 'YYYY-MM-DDThh:mm:ss.SSSSSSZ'
      last_processed_at: now.toISOString(), // 'YYYY-MM-DDThh:mm:ss.SSSSSSZ'
      created_at: now.toISOString(), // 'YYYY-MM-DDThh:mm:ssZ'
      updated_at: now.toISOString(), // 'YYYY-MM-DDThh:mm:ssZ'
      participants: [
        {
          id: 'nyet3', //宛先ID
          email: 'nyet3@outlook.jp', // 宛先のメールアドレス
          name: 'nyet', // 宛先の名前
          organization: 'nyet inc.', // 宛先の会社名
          order: 0, // 書類内の宛先の順序（送信者は 0）
          status: 2, // 0 - アクセス不可
          access_code: 'da', // 宛先に設定されているアクセスコード。APIを使用しているユーザーが値を設定した場合のみレスポンスに含まれる。
          language_code: 'ja', // 宛先の言語設定。ja（日本語）、en（英語）、zh-CHS（簡体字）、zh-CHT（繁体字）のいずれか。
          processed_at: now.toISOString(), // 各受信者による書類の同意/却下日時($YYYY-MM-DDThh:mm:ss.SSSSSSZ)
          access_expires_at: now.toISOString(), //	URL有効期限($YYYY- MM - DDThh: mm: ssZ)
        },
        {
          id: 'nyet0', //宛先ID
          email: 'nyet0@outlook.jp', // 宛先のメールアドレス
          name: 'nyet', // 宛先の名前
          organization: 'nyet inc.', // 宛先の会社名
          order: 0, // 書類内の宛先の順序（送信者は 0）
          status: 0, // 0 - アクセス不可
          access_code: 'da', // 宛先に設定されているアクセスコード。APIを使用しているユーザーが値を設定した場合のみレスポンスに含まれる。
          language_code: 'ja', // 宛先の言語設定。ja（日本語）、en（英語）、zh-CHS（簡体字）、zh-CHT（繁体字）のいずれか。
          processed_at: now.toISOString(), // 各受信者による書類の同意/却下日時($YYYY-MM-DDThh:mm:ss.SSSSSSZ)
          access_expires_at: now.toISOString(), //	URL有効期限($YYYY- MM - DDThh: mm: ssZ)
        },
      ],
      files: [
        {
          id: 'xxxxxxxxxxxx',
          name: '添付ファイル0',
          order: 0,
        },
        {
          id: 'xxxxxxxxxxxx',
          name: '添付ファイル1',
          order: 1,
        },
        {
          id: 'xxxxxxxxxxxx',
          name: '添付ファイル2',
          order: 2,
        },
      ],
    };

    // attribute
    this.attr = {
      attr_title: this.doc.title, // 管理用タイトル
      counterparty: 'nyet3', // 契約相手の名称
      contract_at: now.toISOString().split('T')[0], // 契約締結日 nullを許容する
      validity_start_at: now.toISOString().split('T')[0], // 契約開始日 nullを許容する
      validity_end_at: now.toISOString().split('T')[0], // 契約終了日 nullを許容する
      validity_end_notice_at: now.toISOString().split('T')[0], // 解約通知期限 nullを許容する
      auto_update: '2', // 自動更新の有無: 0(指定なし), 1(あり), 2(なし)
      local_id: 'xxxxxxxx', // 管理番号
      amount: 10000000, // 取引金額 nullを許容する
      options: [
        // ユーザー定義の項目
        {
          order: 1, // ユーザー定義の項目の番号
          content: 'group X', // ユーザー定義の項目の値
        },
        {
          order: 2, // ユーザー定義の項目の番号
          content: 'desk N', // ユーザー定義の項目の値
        },
        {
          order: 3, // ユーザー定義の項目の番号
          content: 'team A', // ユーザー定義の項目の値
        },
      ],
    };
  }
}

export default ItemModel;
