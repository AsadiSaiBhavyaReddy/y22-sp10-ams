const nodemailer = require('nodemailer');

const sendMail = async(subject, textMessage, sent_to, sent_from, reply_to )=>{
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        PORT: "587",
        auth:{
            user:'pavanipinky2004@gmail.co',
            pass:'bwuj twkp udrz swme',
        },
        tls:{
            rejectUnauthorized:false,
        }


    })
    const options = {
        from : {
            name:"K L Placements Office",
            address:sent_from,
        },
        to : sent_to,
        replyTo: reply_to,
        subject: subject,
        //html: htmlMessage,
        text: textMessage,
        
    }

    //Send Mail
    transporter.sendMail(options,function(err,info){
        if(err){
            console.log(err)
        }
        else{
            console.log(info)
        }
    })
}
module.exports = sendMail