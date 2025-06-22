const express = require('express');
const mongoose = require('mongoose');
const productRoute = require("./routes/ProductRoutes");
const userRoute = require("./routes/UserRoutes");
const CategoryRoute = require("./routes/CategoryRoutes");
const StoresRoute = require("./routes/StoreRoutes");
const session = require ('express-session');
const MongoStore = require ('connect-mongo');
require('dotenv').config();
const app = express();


const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/products' , productRoute);
app.use('/categories', CategoryRoute);
app.use('/stores',StoresRoute)
app.use('/auth',userRoute)
app.use(
    session({
      secret: process.env.JWT_SECRET,
      resave: false, // Don't save session if unmodified
      saveUninitialized: false, // Don't create session until something stored
      store: MongoStore.create({
        mongoUrl: '',
        collectionName: 'sessions', // Optional: specify collection name for sessions
        ttl: 14 * 24 * 60 * 60, // Session TTL (Time To Live) in seconds, 14 days
        autoRemove: 'interval', // Remove expired sessions every 'autoRemoveInterval' minutes
        autoRemoveInterval: 10 // In minutes. Default
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week in milliseconds
        httpOnly: true, // Prevents client-side JS from reading the cookie
        sameSite: 'lax', // Protects against CSRF attacks
      }
    })
);
mongoose.connect('').then(()=>{
  app.listen(port,()=>{
    console.log('Express server listening on port ' + port);
  })
}).catch((err)=>{
  console.error("Error connecting to server: ", err);
})

module.exports = app;
