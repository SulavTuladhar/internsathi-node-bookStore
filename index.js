const express = require('express');
const app = express();
const PORT = 9090;

// Importing API router
const API_ROUTER = require('./api.router');

// Initinlizing database connection
require('./db_init');

// Inbuilt middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use('/api', API_ROUTER);

// 404 Error Handler
app.use(function(req,res,next){
    next({
        msg: "Page not found",
        status: 404
    })
})

// Error handler
app.use(function(err,req,res,next){
    res.status(err.status || 400);
    res.json({
        msg: err.message|| err,
        status: err.status || 400
    })
})

app.listen(process.env.PORT || PORT, function(err,connected){
    if(err){
        console.log('Sever listening failed', err);
    }else{
        console.log('Server is Listening at port ' + PORT);
    }
})