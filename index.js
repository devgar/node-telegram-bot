const TeleBot = require('telebot')
const fs = require('fs')

let token
try{
  token = fs.readFileSync("token.txt", 'utf8')
  token = token.replace('\n', '')
} catch(e) {
  if(e.code == 'ENOENT')
    console.log("  Error: token.txt not found")
  else console.log(e)
  process.exit(1)
}
const bot = new TeleBot({
  token: token,
  polling: {limit: 50}
})

bot.on(['/start', '/hello'], (msg) => {
  if(msg.chat.type != 'supergroup')
    return msg.reply.text("Sorry, I only work with supergroups")
  msg.reply.text('Hola! He llegado para gestionar los mensajes anclados')
  msg.reply.text(msg.text.slice(7) || 'Untitled').then( d => {
    bot.pinChatMessage(d.result.chat.id, d.result.message_id)
  })
})

bot.on(['/add', '/anclar'], require('./lib/cmd_add')(bot) )

bot.on(['/title', '/titulo'], (msg) => {
  
})

bot.start()
