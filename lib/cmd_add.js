

module.exports = function cmd_add_generator( bot ) {
  return function cmd_add(msg) {
    if(msg.chat.type != 'supergroup')
      return msg.reply.text("No puedo trabajar aquí 😩")
      
    bot.getChat(msg.chat.id).then( data => {
      if(!data.ok) return msg.reply.text("Ocurrió un error", { asReply: true })
      
      let chat = data.result

      if(!chat.pinned_message)
        return msg.reply.text("No existe mensaje anclado", { asReply: true })
        
      let txt = buildUpdatedText(chat, msg)
      
      if(!txt)
        return msg.reply.text("No encuentro ninguna url en tu mensaje", { asReply: true })
      
      let ID = { chatId:chat.id, messageId: chat.pinned_message.message_id }
      bot.editMessageText( ID, txt, {webPreview:false})
      .catch(err => console.log("Err:", err))
      
    }).catch( err => console.log("Err:", err))
  }
}


function buildUpdatedText(chat, msg) {
  let txt = chat.pinned_message.text
  let ok = false
  msg.entities.forEach(elem => {
    if(elem.type == 'url'){
      ok = true
      let fragment = msg.text.slice(elem.offset, elem.offset + elem.length)
      txt += '\n' + fragment
      console.log("Adding fragment:", fragment, elem.offset, elem.length)
    }
  });
  if(!ok) return "";
  else return txt;
}
