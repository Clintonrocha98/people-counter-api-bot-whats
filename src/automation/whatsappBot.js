import whatsappWeb from 'whatsapp-web.js';
import { MongoStore } from 'wwebjs-mongo';
import qrcode from 'qrcode-terminal';
import { mongoose } from '../database/mongoose/config.js';
import service from '../api/service.js';
import { errorHandler } from '../shared/errorHandler/error-handler.js';

const { Client, RemoteAuth } = whatsappWeb;

const store = new MongoStore({ mongoose: mongoose });

const client = new Client(
  {
    puppeteer: {
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
    authStrategy: new RemoteAuth({
      store: store,
      backupSyncIntervalMs: 600000,
    }),
  });

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('auth_failure', msg => {
  console.error('AUTHENTICATION FAILURE', msg);
});

client.on('message_create', async (message) => {
  if (message.body === '!pessoas') {
    const [err, data] = await service.getCurrentPeopleCount();

    if (err) {
      const { errMessage, errStatusCode } = errorHandler(err);
      console.log(errMessage, errStatusCode);
      message.reply(`Problema na contagem de pessoas: ${errMessage}, status code: ${errStatusCode}`);
    }
    const dateUpdate = new Date(data.lastUpdated).toLocaleString();

    const msg = `🔢 Atualização de Presença 🔢\n\n👥 Número total de pessoas na sala: ${data.totalPeople}\n⏰ Última atualização: ${dateUpdate}\n`;
    message.reply(msg);
  }
  if (message.body === "!site") {
    const msg = "Acesse o site e veja em tempo real a quantidade de pessoas na sala! 📊️\nhttps://clintonrocha98.github.io/people-counter-front/";
    message.reply(msg);
  }
});


export default client;