const mongoose = require('mongoose')

const formSchema = new mongoose.Schema({

    Name:{
        type:String,
        required:true
    },

    Type: {
        type:String,
        required:true
    },
    Cost:{
        type:Number,
    },
   
    Cuisine:{
        type: String,
        required:true
    },
    

})

const Form = mongoose.model('form',formSchema)

module.exports = Form;