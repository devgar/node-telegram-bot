const TeleBot = require('telebot');
const fs = require('fs');

let token = fs.readFileSync("token.txt", 'utf8');

const bot = new TeleBot({
  token: token,
  polling: {limit: 50}
});

bot.on(['/start', '/hello'], (msg) => msg.reply.text('Welcome!'));

bot.on('text', (msg) => msg.reply.text(msg.text));

bot.start();
