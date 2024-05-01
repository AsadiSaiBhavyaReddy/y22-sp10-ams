
const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb')
const bcrypt = require('bcrypt')

const app = new express();
app.use(express.json());
app.use(cors());

const client = new MongoClient('mongodb+srv://admin3:admin3@cluster0.lgtiwmy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
client.connect();
const db = client.db("skill")
const col = db.collection("user")
const col2 = db.collection("Details")
const col3 = db.collection("Detail")
const col4= db.collection("store")
app.get('/home', (req,res) => {
    res.send("It is a home page - new page")
})

app.post('/insert', async (req, res) => {
    const existingUser = await col.findOne({ $or: [{ email: req.body.email }, { name: req.body.name }] });
    if (existingUser) {
        let error = '';
        if (existingUser.email === req.body.email) {
            error = 'Email already exists';
        } else if (existingUser.name === req.body.name){
            error = 'Username already exists';
        }
        res.json({ status: 'error', error, message: 'Please choose a different email or username' });
    } else {
        req.body.password = await bcrypt.hash(req.body.password, 5);
        console.log(req.body);
        col.insertOne(req.body);
        res.json({ status: 'success', message: 'Sucessfully Regsitered' });
    }
});
app.post('/check',async (req, res) => {
    console.log(req.body)
    var result=await col.findOne({"name":req.body.un})
    if(result != null){
        if(await bcrypt.compare(req.body.pw, result.password)){
            res.send(result);
        }
        else{
            res.send("fail")
        }

    }
    else{
        res.send("fail")

    }
})


app.get('/show', async (req, res) => {
    var result = await col.find().toArray();
    console.log(result);
    res.send(result);
})


app.post('/entry', (req,res) => {
    console.log(req.body);
    col2.insertOne(req.body);
    res.send("Successfully Inserted");
})

app.put('/entry', async (req, res) => {
    console.log(req.body);
    var doc = {
        $set: {
            sname: req.body.sname,
            pstatus: req.body.pstatus,
            scompany: req.body.scompany,
            sctc: req.body.sctc
        }
    }
    await col2.updateOne({sid:req.body.sid}, doc)
    res.send("updated successfully")
})

app.get('/display',async (req,res) => {
    var result = await col2.find().toArray();
    res.send(result);
})
app.delete('/delete', async (req, res) => {
    console.log(req.query);
    await col2.deleteOne({sid:req.query.id});
    res.send("deleted");
})



app.post('/entry', (req,res) => {
    console.log(req.body);
    col3.insertOne(req.body);
    res.send("Successfully Inserted");
})

app.put('/entry', async (req, res) => {
    console.log(req.body);
    var doc = {
        $set: {
            sname: req.body.sname,
            pstatus: req.body.pstatus,
            scompany: req.body.scompany,
            sctc: req.body.sctc,
            
        }
    }
    await col3.updateOne({sid:req.body.sid}, doc)
    res.send("updated successfully")
})

app.get('/display',async (req,res) => {
    var result = await col3.find().toArray();
    res.send(result);
})
app.delete('/delete', async (req, res) => {
    console.log(req.query);
    await col3.deleteOne({sid:req.query.id});
    res.send("deleted");
})




const sendMail = require('./utils/sendMail')
app.post('/api/sendMail',async(req,res)=>{
    const{email,message,subject} = req.body

    try{
        const sent_to = email
        const sent_from = process.env.EMAIL_USER
        const reply_to = email
        const mailsubject = subject
       
        const textMessage = message
        await sendMail(mailsubject,  textMessage,sent_to, sent_from, reply_to);
        res.status(200).json({success:true,message:"Email sent successfully"})
    }
    catch(err){
        res.status(500).json(err.message)
    }
})

app.post('/entry', (req,res) => {
    console.log(req.body);
    col2.insertOne(req.body);
    res.send("Successfully Inserted");
})

app.put('/entry', async (req, res) => {
    console.log(req.body);
    var doc = {
        $set: {
            sname: req.body.sname,
            pstatus: req.body.pstatus,
            scompany: req.body.scompany,
            sctc: req.body.sctc
        }
    }
    await col2.updateOne({sid:req.body.sid}, doc)
    res.send("updated successfully")
})

app.get('/display',async (req,res) => {
    var result = await col2.find().toArray();
    res.send(result);
})
app.delete('/delete', async (req, res) => {
    console.log(req.query);
    await col2.deleteOne({sid:req.query.id});
    res.send("deleted");
})



app.post('/shop', (req,res) => {
    console.log(req.body);
    col4.insertOne(req.body);
    res.send("Successfully Inserted");
})

app.put('/shop', async (req, res) => {
    console.log(req.body);
    var doc = {
        $set: {
            name: req.body.name,
            pstatus: req.body.pstatus,
            price: req.body.price,
            rating: req.body.rating,
            date: req.body.date
            
        }
    }
    await col4.updateOne({sid:req.body.sid}, doc)
    res.send("updated successfully")
})

app.get('/store',async (req,res) => {
    var result = await col4.find().toArray();
    res.send(result);
})

app.delete('/remove', async (req, res) => {
    const userName = req.query.name;
    await col.deleteMany({ name: userName });
    res.send('deleted');
});


app.listen(8081);
console.log("Server Running");