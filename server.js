const path = require('path');
const env = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: path.resolve(__dirname, `.env.${env}`) });

const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, {
    webHook: true
});

const app = express();
const PORT = process.env.PORT || PAST YOUR PORT HERE;

// Use your actual Ngrok domain
const url = 'PAST YOUR URL HERE';
const webhookUrl = `${url}/webhook`;

bot.setWebHook(webhookUrl);

app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.post('/webhook', (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
