const express=require('express');
const router=express.Router();
const nodemailer=require('nodemailer');
const {google}=require('googleapis');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');

router.post('/sendMail',async(req,res)=>{
const email=req.body.email;
const subject=req.body.subject;
const textmsg=req.body.message;


    const CLIENT_ID=process.env.CLIENT_ID
    const CLIENT_SECRET=process.env.CLIENT_SECRET
    const REDIRECT_URL=process.env.REDIRECT_URL
    const REFRESH_TOKEN=process.env.REFRESH_TOKEN


    const oAuth2Client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URL);
    oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})
    try{
        const accessToken=oAuth2Client.getAccessToken();
        const transport=nodemailer.createTransport({
            service:'gmail',
            auth:{
                type:'OAuth2',
                user:'sanjeet3357@gmail.com',
                clientId:CLIENT_ID,
                clientSecret:CLIENT_SECRET,
                refreshToken:REFRESH_TOKEN,
                accessToken:accessToken
            }
        })
        const mailOptions={
            from:'Sanjeet kumar<sanjeet3357@gmail.com>',  //sender email id
            to:email,             //reciever email address
            subject:subject,   //subject of email
            text:textmsg,
            html:`<h1>${textmsg}</h1>`
        };
        const result=await transport.sendMail(mailOptions);
        res.status(200).json({message:'Email Sent SuccessFully'});
    }catch(err){
        res.status(400).json({message:"Something Error Ocuured"})
    }
})


module.exports=router;