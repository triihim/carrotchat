const express = require('express');
const pingRouter = require('./routes/ping');
const utilsRouter = require('./routes/utils');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('/public'));

app.get('/', (req, res) => {
    res.render('entrance');
});

app.use('/ping', pingRouter);
app.use('/utils', utilsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port} in ${process.env.NODE_ENV} mode.`);
});