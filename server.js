const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.get('/', (req, res) => res.json({ msg: 'welcome to the app' }));

//Routes
app.use('/api/jwtauth', require('./routes/jwtauth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
