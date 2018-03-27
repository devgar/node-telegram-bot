const TeleBot = require('telebot')

let token = process.argv.length > 2 ? process.argv[2] : process.env.TOKEN 

if(!token) {
  try{
    const fs = require('fs')
    token = fs.readFileSync("token.txt", 'utf8')
    token = token.replace('\n', '')
  } catch(e) {
    if(e.code == 'ENOENT')
      console.log("  Error: token.txt not found")
    else console.log(e)
    process.exit(1)
  }
}

const bot = new TeleBot({
  token: token,
  polling: {limit: 50}
})

bot.on(['/start', '/hello'], (msg) => {
  if(msg.chat.type != 'supergroup')
    return msg.reply.text("Sorry, I only work with supergroups")
  console.log(msg)
  msg.reply.text(msg.text.slice(msg.entities[0].length) || '<Untitled>')
  .then( d => {
    bot.pinChatMessage(d.result.chat.id, d.result.message_id)
  })
})

bot.on(['/add', '/anclar'], require('./lib/cmd_add')(bot) )

bot.on(['/title', '/titulo'], (msg) => {
  
})

bot.start()
