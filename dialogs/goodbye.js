module.exports = function(bot) {
  bot
    .dialog("Goodbye", function(session, args) {
      session.send("You're welcome, %s!", session.message.text);
      session.endDialog();
    })
    .triggerAction({
      matches: /^bye|goodbye|good\sbye|thanks|ok$/i
    });
};
