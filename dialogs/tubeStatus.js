var getTubeStatus = require("../services/getTubeStatus");

module.exports = function(bot) {
  bot
    .dialog("TubeStatus", function(session, args) {
      // Show typing dots while we await response from service
      session.sendTyping();
      // Send response message to client
      getTubeStatus(messageResult => {
        session.send(messageResult);
        session.endDialog();
      });
    })
    .triggerAction({
      matches: "TubeStatus"
    });
};
