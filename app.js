
const express = require('express');
const app = express();

//views
app.set('view engine', 'ejs');
app.set('views', 'views');

//public
app.use(express.static('public'));

//routes
app.use(require('./routes/index'));
// app.use(require('./routes/api'));

app.listen(3005, () => {
    console.log('Listening on port 3005');
});