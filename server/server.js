const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));


let taskrouter = require('./routes/task.router');
app.use('/task', taskrouter);


const PORT = 5000;
app.listen(PORT, () => {
    console.log('listening on port', PORT)
});