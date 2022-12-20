const express = require("express");
const morgan = require('morgan');
const routes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 300;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(morgan('dev'));


app.use('/api', routes);



app.listen(PORT, () => {
    console.log('Listening on PORT : ', PORT);
});
