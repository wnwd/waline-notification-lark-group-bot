# waline-notification-lark-group-bot

中文文档 | [English Doc](./README.md)

一个[Waline](https://waline.js.org/)插件，提供 [**飞书群聊机器人**](https://open.feishu.cn/document/client-docs/bot-v3/add-custom-bot) 通知功能。

## 如何安装
```shell
npm install waline-notification-lark-group-bot
```

## 如何使用
编辑你的服务端 Waline 文件：

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
把 `"waline-notification-lark-group-bot": "latest"` 添加到 `package.json` 文件的依赖项中。


## 环境变量
- `LARK_GROUP_WEBHOOK`：飞书群聊机器人 webhook URL。 例如 `https://open.larksuite.com/open-apis/bot/v2/hook/b55f4f3c-478c-4256-8ba9-cf217f288987`
- `SITE_NAME`： 你的站点名字，用来显示在通知消息中。
- `SITE_URL`：你的站点名字，用来显示在通知消息中。
- `LARK_TITLE_TEMPLATE`：（可选）标题模板，默认为`{{self.name}} 有新评论啦`，用来显示在通知消息中的标题。
- `LARK_TEMPLATE`：（可选）你可以自定义通知模板，请参考官方文档 [this document](https://waline.js.org/guide/features/notification.html#%E9%80%9A%E7%9F%A5%E6%A8%A1%E6%9D%BF)。

默认的模板如下：
```
【昵称】：{{self.nick}}
【邮箱】：{{self.mail}}
【内容】：{{self.comment}}
【地址】：{{site.postUrl}}
```

在修改环境变量后，你需要 **重新部署** Waline服务端。