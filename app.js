const express=require('express');
const app=express();
const path=require('path');
const userModel=require('./models/user');

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/read',async (req,res)=>{
    let readUsers= await userModel.find();

    res.render('read',{useers:readUsers});
})
app.get('/edit/:id',async (req,res)=>{
    let editUsers= await userModel.findOne({_id:req.params.id});

    res.render('edit',{useers:editUsers});
})
app.get('/delete/:id',async (req,res)=>{
    let deleteUser= await userModel.findOneAndDelete({_id:req.params.id})
    res.redirect('/read')
})
app.post('/edit/:id',async (req,res)=>{
     let{name,email,image}=req.body;
     let editUsers= await userModel.findOneAndUpdate({_id:req.params.id},{name,email,image},{new:true});
     res.redirect('/read');
})
app.post('/create',async (req,res)=>{
    let{name,email,image}=req.body;
    let createdUser= await userModel.create({
        name,
        email,
        image
    })
    res.redirect('/read');

})
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})