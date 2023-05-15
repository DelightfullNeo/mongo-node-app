const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const expressbars = require('express-handlebars');
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000;
const app = express();
const hbs = expressbars.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs',hbs.engine);
app.set('view engine','hbs');
app.set('views','views');

app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname,'public')));

app.use(todoRoutes);

async function start() {
  try {
    await mongoose.connect('mongodb+srv://admin:admin@cluster.ovkwusd.mongodb.net/123', {
      useNewUrlParser: true
    })
    app.listen(PORT, () => {
      console.log(`Сервер працює на порту ${PORT}`)
    });
  }
  catch(e){
    console.log(e);
  }
}

start();