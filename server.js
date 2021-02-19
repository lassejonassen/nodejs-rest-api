if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const indexRouter = require('./routes/index');
const contactRouter = require('./routes/contact');

app.set('view engine', 'ejs');
app.set ('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

// Connecting to mongodb
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true  
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to mongoose.'))


//Routes
app.use('/', indexRouter);
app.use('/contacts', contactRouter);


const PORT = 3000;
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on PORT http://localhost:${ PORT }.`);
});
