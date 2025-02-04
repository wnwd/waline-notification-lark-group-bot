# waline-notification-lark-group-bot

A [Waline](https://waline.js.org/) plugin that provide [**lark group bot**](https://open.larksuite.com/document/client-docs/bot-v3/add-custom-bot) notification spport.

[中文文档](./README_CN.md) | English Doc

## How to install
```shell
npm install waline-notification-lark-group-bot
```

## How to use
Edit your Waline File:

index.js
```js
const Application = require('@waline/vercel');
const LarkGroupBot = require('waline-notification-lark-group-bot');

module.exports = Application({
  plugins: [LarkGroupBot],
  async postSave(comment) {
    // do what ever you want after comment saved
  },
});
```

### package.json
Add `"waline-notification-lark-group-bot": "latest"` into `package.json` dependencies.


## Environment Variables
- `LARK_GROUP_WEBHOOK`: Lark group bot webhook URL. e.g. `https://open.larksuite.com/open-apis/bot/v2/hook/b55f4f3c-478c-4256-8ba9-cf217f288987`
- `SITE_NAME`: Your site name, used for display in notification message.
- `SITE_URL`: Your site URL, used for display in notification message.
- `BARK_TITLE_TEMPLATE`: (optional) Title template. The default value is `{{self.name}} 有新评论啦`, which is used to display the title in the notification message.
- `LARK_TEMPLATE`: (optional) Your custom notification template, please refer [this document](https://waline.js.org/en/guide/features/notification.html#notification-template).

The default template is as follow:
```
【昵称】：{{self.nick}}
【邮箱】：{{self.mail}}
【内容】：{{self.comment}}
【地址】：{{site.postUrl}}
```

You need **redeploy** after change environment variables.