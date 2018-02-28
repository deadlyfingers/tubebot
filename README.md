# TubeBot

A bot that relays London Underground tube disruptions and tube line status upon request.

# Requirements

- Register with the [Transport For London API portal](https://api-portal.tfl.gov.uk/signup) to get **TFL App Id and Key**.

# Node.js

This is a Node.js bot so just check you have [Node.js 6.9.1](https://nodejs.org/en/) or better installed.

# Setup

`npm install`

# Running

If you want to run the bot locally from within [VS Code](https://code.visualstudio.com/) then add an '**.env**' file into project's root directory and configure the required environment variables as follows:

```
# Bot Config (leave App Id and Password blank for testing bot locally in the emulator)
BotId="YOUR_BOT_NAME"
MicrosoftAppId=""
MicrosoftAppPassword=""
BotStateEndpoint=""
BotOpenIdMetadata=""
UseTableStorageForConversationState=false

# LUIS.AI credentials
LuisAPIKey="YOUR_LUIS_KEY"
LuisAppId="YOUR_LUIS_ID"
LuisAPIHostName="westus.api.cognitive.microsoft.com"
LUIS_MODEL_URL=""

# TFL API credentials
TFL_APP_ID="YOUR_TLF_APP_ID"
TFL_APP_KEY="YOUR_TLF_KEY"
TFL_API_HOST="api.tfl.gov.uk"
```

# Testing

`npm test`

# Bot Framework

- Developed using [botbuilder](https://www.npmjs.com/package/botbuilder) package for Node.js.
