const mongoose = require('mongoose');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dbName = 'BookStore';
const connectionURL = 'mongodb+srv://test:test1234@cluster0.ijhkt9h.mongodb.net/?retryWrites=true&w=majority';
const OID = mongodb.ObjectId;

mongoose.set('strictQuery', false);

// mongodb://localhost:27017/db_name
mongoose.connect(connectionURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
},function(err,done){
    if(err){
        console.log('Db connection failed', err);
    }else{
        console.log('Database connection open');
    }
})