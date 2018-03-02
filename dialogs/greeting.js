var emoji = require("node-emoji");
var getRandomPhrase = require("../utils/phrases").getRandomPhrase;

module.exports = function(bot) {
  bot
    .dialog("Greeting", function(session, args) {
      const phrases = [
        "what's your tube status request?",
        "I can check tube status and any line status updates...",
        "tell me which tube line you are taking?",
        "give me a tube line to check!",
        "ask me about any service problems!",
        "try asking about line status by colour!"
      ];
      var greeting = getRandomPhrase(phrases);
      session.send(
        "%s, " + greeting + emoji.emojify(" :metro:") + emoji.emojify(" :robot_face:"),
        session.message.text
      );
      session.endDialog();
    })
    .triggerAction({
      matches: /^(hi|hello|hey|yo)$/i
    });
};
