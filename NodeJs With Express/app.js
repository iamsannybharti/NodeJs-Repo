const express = require('express');
let app = express();

// route =http method + Url ;
app.get('/',(req,res)=>{
    // res.send('hello form express server');
    // res.status(200).send('hello form express server');
    res.status(200).json({Name:"hello", Id:25});
});

//create a server
const PORT=8000;
app.listen(PORT,()=>{
    console.log("server has started");
});