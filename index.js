const fetch = require('node-fetch');
const nunjucks = require('nunjucks');
const crypto = require('crypto');

module.exports = {
  hooks: {
    async postSave(comment, parent) {
      const { LARK_GROUP_WEBHOOK, LARK_GROUP_SECRET, SITE_NAME, SITE_URL, LARK_TEMPLATE, LARK_TITLE_TEMPLATE} = process.env;

      if (!LARK_GROUP_WEBHOOK) {
        return false;
      }

      comment.comment = comment.comment.replace(/(<([^>]+)>)/gi, '');

      const data = {
        self: comment,
        parent,
        site: {
          name: SITE_NAME,
          url: SITE_URL,
          postUrl: SITE_URL + comment.url + '#' + comment.objectId,
        },
      };

      const title_template = LARK_TITLE_TEMPLATE || `{{site.name|safe}}  有新评论啦`;
      const title = nunjucks.renderString(title_template, data);

      const content_template = LARK_TEMPLATE || `【昵称】：{{self.nick}}
【邮箱】：{{self.mail}}
【内容】：{{self.comment}}
【地址】：{{site.postUrl}}`;

      const content = nunjucks.renderString(content_template, data);

      const post = {
        en_us: {
          title: title,
          content: [
            [
              {
                tag: 'text',
                text: content.trim(),
              },
            ],
          ],
        },
      };

      let signData = {};
      const msg = {
        msg_type: 'post',
        content: {
          post,
        },
      };

      const sign = (timestamp, secret) => {
        const signStr = timestamp + '\n' + secret;
        return crypto.createHmac('sha256', signStr).update('').digest('base64');
      };

      if (LARK_GROUP_SECRET) {
        const timestamp = Math.floor(Date.now() / 1000);
        signData = { timestamp: timestamp, sign: sign(timestamp, LARK_SECRET) };
      }

      try {
        const resp = await fetch(LARK_GROUP_WEBHOOK, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...signData,
            ...msg,
          }),
        }).then((resp) => resp.json());

        if (resp.status !== 200) {
          console.log('Lark Notification Failed:', JSON.stringify(resp));
        } else {
          console.log('Lark Notification Success:', JSON.stringify(resp));
        }
      } catch (error) {
        console.error('Send Lark notification ERROR:', error);
      }
    },
  },
};