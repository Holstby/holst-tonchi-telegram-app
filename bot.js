const path = require('path');
const env = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: path.resolve(__dirname, `.env.${env}`) });

const TelegramBot = require('node-telegram-bot-api');
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, {
    webHook: true
});

// Use your actual Ngrok domain
const url = 'PAST YOUR URL HERE';
const webhookUrl = `${url}/webhook`;

bot.setWebHook(webhookUrl);

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Received your message');
});

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Welcome to Tonchi Crypto Wallet! Click to open your wallet: [Open Wallet](${url})`);
});
