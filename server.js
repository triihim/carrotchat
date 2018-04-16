const express = require('express');
const socket = require('socket.io');

const app = express();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Server running on port ${port} in ${process.env.NODE_ENV} mode.`);
});

const io = socket(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(require('body-parser').urlencoded({ extended: false }));

app.use('/', require('./routes/root'));
app.use('/ping', require('./routes/ping'));
app.use('/utils', require('./routes/utils'));
app.use('/chat', require('./routes/chat'));
app.use('/*', require('./routes/catchall'));

setInterval(() => { 
    require('./functions/refresh').refresh()
}, require('./config').refreshInterval);

