var builder = require("botbuilder");
var restify = require("restify");
var path = require("path");

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || 3978, function() {
  console.log("%s listening to %s", server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
});

// Listen for messages from users
server.post("/api/messages", connector.listen());

// Create your bot with a function to receive messages from the user
// This default message handler is invoked if the user's utterance doesn't
// match any intents handled by other dialogs.
var bot = new builder.UniversalBot(connector, function(session, args) {
  session.send("Sorry, but I can't do that... If all else fails ask for help!", session.message.text);
});

// LUIS Model URL
const LUIS_MODEL_URL =
  process.env.LUIS_MODEL_URL ||
  "https://" +
    path.join(process.env.LuisAPIHostName + "/luis/v2.0/apps/" + process.env.LuisAppId) +
    "?subscription-key=" +
    process.env.LuisAPIKey +
    "&verbose=true&timezoneOffset=0&q=";

// Create a recognizer that gets intents from LUIS
var recognizer = new builder.LuisRecognizer(LUIS_MODEL_URL);

// Add the recognizer to the bot
bot.recognizer(recognizer);

// Dialogs
require("./dialogs/greeting")(bot);
require("./dialogs/goodbye")(bot);
require("./dialogs/help")(bot);
require("./dialogs/tubeStatus")(bot);
require("./dialogs/tubeLineStatus")(bot);
