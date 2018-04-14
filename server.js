const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('/public'));

app.use('/', require('./routes/root'));
app.use('/ping', require('./routes/ping'));
app.use('/utils', require('./routes/utils'));
app.use('/*', require('./routes/catchall'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port} in ${process.env.NODE_ENV} mode.`);
});