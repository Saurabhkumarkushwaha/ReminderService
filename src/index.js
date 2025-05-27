const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
//const { createChannel,subscribeMessage } = require('./utils/messageQueue');

//const { sendBasicEmail } = require('./services/email-service');
const TicketController = require('./controllers/ticket-controller');
const EmailService = require('./services/email-service');

//const jobs = require('./utils/job');
const {subscribeMessage, createChannel } = require('./utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('./config/serverConfig');

//const m = require('./models/notificationticket');

const  setupAndStartServer = async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    //const channel = await createChannel();

    app.post('/api/v1/tickets', TicketController.create);

    const channel = await createChannel();
    subscribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY);

    app.listen(PORT , () => {
        console.log(`Server Started at port ${PORT}`);
        //jobs();
        // sendBasicEmail(
        //     'saurabh620548@gmail.com',
        //     'sk62054847@gmail.com',
        //     'This is a testing email',
        //     'Hey, how are you, I hope you like the support'
        // );
        
    });
}

setupAndStartServer();