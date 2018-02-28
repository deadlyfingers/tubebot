var builder = require("botbuilder");
var has = require("lodash/has");
var get = require("lodash/get");

var getTubeLineStatus = require("../services/getTubeLineStatus");

module.exports = function(bot) {
  bot
    .dialog("TubeLineStatus", [
      function(session, args, next) {
        // Checks if path has a 'values' property of LUIS object
        if (!has(args, "intent.entities[0].resolution.values")) {
          // Handle unknown entity or typo
          // Suggesting user to try again...
          session.send("Oh I'm sorry I wasn't listening. What was that you said?");
          session.endDialog();
          return;
        }

        // Get value at path of object
        var values = get(args, "intent.entities[0].resolution.values", []);

        // Resolve entity values passed from LUIS
        if (values.length === 1) {
          // Only 1 option - automatically continue to the next step!
          next(args);
        } else if (values.length > 1) {
          var options = values.join("|");
          // Multiple options available.
          // eg. If you say 'blue line status' you will get 'piccadilly' and 'victoria' as possible options.
          builder.Prompts.choice(session, "Which line?", options, {
            listStyle: builder.ListStyle.button
          });
        } else {
          throw new Error("Failed to resolve to LUIS entity values");
        }
      },
      function(session, args) {
        // Resolve id from LUIS values or from button response
        var id = null;
        if (has(args, "intent.entities[0].resolution.values")) {
          id = get(args, "intent.entities[0].resolution.values[0]");
        } else if (has(args, "response.entity")) {
          id = get(args, "response.entity");
        }
        // If we don't get an id throw error
        if (!id) {
          throw new Error("Failed to resolve id from response");
        }

        // Show typing dots while we wait on response from service
        session.sendTyping();
        // Send response message to client
        getTubeLineStatus(messageResult => {
          session.send(messageResult);
          session.endDialog();
        }, id); // also sending id for use in the request
      }
    ])
    .triggerAction({
      matches: "TubeLineStatus"
    });
};
