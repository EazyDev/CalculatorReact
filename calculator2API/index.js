const express = require('express');
const app = express();
const mongoose = require('mongoose');
const parser = require('body-parser');

const historyModel = require('./models/historyModel');

app.use(parser.urlencoded({extended:true}));
app.use(parser.json());


app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});



mongoose.connect("",function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Atlas is connected");
    }
});


//getting all the expression , Add pagination if there will be a lot of data.
app.get('/',function(req,res){

    historyModel.find({})
    .sort('-createdOn')
    .exec()
    .then(history => {
        res.send(history).status(200);
    });
});

//Posting an expression
app.post('/',function(req,res){

    const newHis = new historyModel({
        _id: new mongoose.Types.ObjectId(),
        expr: req.body.expr,
        ans: req.body.ans,
        opr: req.body.opr,
    });

    newHis.save(function(err,newEntry){
        if(err)
            res.json(err).status(400);
        else
            res.json(newEntry).status(201);
    });

});

app.delete('/',function(req, res){
    historyModel.remove({},(err, todo) => {
        // As always, handle any potential errors:
        if (err) return res.status(500).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        const response = {
            message: "successfully deleted all records",
        };
        return res.status(200).send(response);
    });

});




app.listen(3001,function () {
    console.log('our server is live on port 3001');
})
