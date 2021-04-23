const express =require('express')
const mongoose = require('mongoose');

const productRoutes=require( './router/product.js')
const formRoutes = require('./routes/formRoutes')

const app = express();
app.use(express.json())
const PORT = 5000;

// app.use(express.urlencoded({extended:true}))

const dbURI = 'mongodb+srv://Raj:211221@cluster1.mg6wb.mongodb.net/nodeClg?retryWrites=true&w=majority'

mongoose.connect(dbURI,{useNewUrlParser:true,
                        useUnifiedTopology:true,
                        useCreateIndex:true })
                        .then(console.log('connected'))
                        .then((result)=> app.listen(5000, ()=>console.log("server running")))
                        .catch((err)=>console.log(err));


// app.use('/product', productRoutes)
// app.use('/',(req,res)=>{
//     res.send("home")
// })
app.use(formRoutes)




// app.listen(PORT, ()=> console.log('server running'))