const express=require('express');
const app=express();
const bodyParser=require('body-parser');
app.use(bodyParser.json());
require('dotenv/config')
app.use('/',require('./router/index'))

app.listen(process.env.PORT || 3000,(err)=>{
if(err){
    console.log(`Error in Server ${err}`)
}
else{
    console.log("Server is running on Port 3000");
}
})