const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

const sendDocument = (filename, buffer, info) => {
  const caption = `<b>${info.template}</b>\n${filename}\n\nby <b>${info.user}</b>`;
  bot.telegram.sendDocument(process.env.TELEGRAM_CHAT, { source: buffer, filename }, {
    caption,
    parse_mode: 'HTML',
  });
};

module.exports = {
  sendDocument,
};