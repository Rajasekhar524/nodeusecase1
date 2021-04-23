const Form = require('../Form/Form')
const express = require('express');

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString =queryString;
    }

    filtering() {
        const queryobj = {...this.queryString};
        const excludedfields=['page','sort','limit'];
        excludedfields.forEach(el=>delete queryobj[el]);
        let querystr = JSON.stringify(queryobj);
        querystr = querystr.replace(/\b(gte|gt|lt|lte)\b/g, match=>`$${match}`);
        this.query.find(JSON.parse(querystr));
        return this;
    }
    sorting() {
        if(this.queryString.sort){
            const sortby = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortby);
        }
        else {
            this.query = this.query.sort('-createAt');
        }
        return this;
    }
    paginating(){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}


module.exports.form_get = async (req,res) => {
    try{
        const timetaken="Time taken by the search"
        console.time(timetaken);
        const features = new APIfeatures(Form.find(),req.query).filtering().sorting().paginating();
        const Forms = await features.query;
        console.timeEnd(timetaken);

        res.send(Forms)

    } catch(err) {
        console.log(err)
    }
}

module.exports.form_getOne = async (req,res) => {
    try {
        const oneForm = await Form.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data:oneForm
        })
        // res.send(oneCollege)
       
    } catch(err) {
        console.log(err)
    }
}

module.exports.form_post = async (req,res) => {
    
    
   
    try {
    const item = await Form.create(req.body);
       
       res.send(item)
   
    } catch(err) {
        console.log(err)
    }   
}