# TubeBot

A bot that relays London Underground tube disruptions and tube line status upon request.

# Sample requests
- "What's the tube status?"
- "Is the Bakerloo line ok?"
- "Met line status"
- "Any delays on the dark blue line?"

# Prerequisites

- This [Node.js](https://nodejs.org/en/) bot requires **6.9.1** or better installed.
- Register with the [Transport For London API portal](https://api-portal.tfl.gov.uk/signup) to get your own **TFL App Id and Key**.
- Sign-in to the [LUIS portal](https://www.luis.ai) select **My apps > Import new app** to import the '**LUIS.json**' file. Remember to train and publish the app for use with the bot.
- Save the following as an '**.env**' file into your project's root directory and configure the required environment variables:


###### Save '.env' file
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

# Setup

`npm install`

# Running

1. Select **Debug > Start Debugging** in [VS Code](https://code.visualstudio.com/)
2. Run the [Bot Framework emulator](https://github.com/Microsoft/BotFramework-Emulator/releases) at `http://localhost:3978/api/messages` with the *App ID* and *App Password* set to empty values to test the bot locally.

# Testing

`npm test`

# Deployment

1. **Fork** this repo.
2. Create **Bot Service** in [Azure portal](https://portal.azure.com).
3. Once the Bot Service is provisioned select **Application Settings** >
    - Enter your **TFL App Id and Key** (using same environment variables as the **.env** file).
    - Remember to **Save** changes!
4. Select **Build** >
    - Under the *Continuous deployment from source control* section choose
**Configure continuous deployment** and hook it up with your GitHub fork.

# Bot Framework

- Developed using [botbuilder](https://www.npmjs.com/package/botbuilder) package for Node.js.
