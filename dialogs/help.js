var util = require("util");
var getExampleQuery = require("../utils/phrases").getExampleQuery;

module.exports = function(bot) {
  bot
    .dialog("Help", function(session, args) {
      var query = getExampleQuery();
      var message = util.format(
        'You can ask me about London tube status, or status for a line. For example: \n"%s"',
        query
      );
      session.send(message);
      session.endDialog();
    })
    .triggerAction({
      matches: "OnDevice.Help"
    });
};
