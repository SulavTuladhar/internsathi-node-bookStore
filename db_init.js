const mongoose = require('mongoose');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dbName = 'BookStore';
const connectionURL = 'mongodb://localhost:27017';
const OID = mongodb.ObjectId;

mongoose.set('strictQuery', false);

// mongodb://localhost:27017/db_name
mongoose.connect(connectionURL + '/' + dbName, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
},function(err,done){
    if(err){
        console.log('Db connection failed', err);
    }else{
        console.log('Database connection open');
    }
})