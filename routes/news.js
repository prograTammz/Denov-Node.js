const express = require('express');
const router = express.Router();
const {News, validate} = require('../models/news');
const {User} = require('../models/users');
const auth = require('../middleware/auth');
const _ = require('lodash');

router.post('/',auth, async (req,res)=>{
    const {error} = validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    if(req.user.isAdmin || req.user.isSuperAdmin){
        //do nothing
    }else{
        return res.status(401).send("Access denied, Not authorized");
    }
    const user = await User.findById(req.user._id);
    let news = new News({
        title: req.body.title,
        body: req.body.body,
        author: `${user.firstName} ${user.lastName}`,
        date: Date.now()
    });
    news.save().then((news)=>{
        res.send(news);
    })

})
router.get('/count',async(req,res)=>{
    News.estimatedDocumentCount().exec().then((count)=>{
        res.json(count);
    }).catch((err)=>{
        res.status(400).send(err);
    })
})
router.get('/',async(req,res)=>{
    let pageNo = parseInt(req.query.pageNo)
    let size = parseInt(req.query.size)
    let query = {}
    if(pageNo < 0 || pageNo === 0) {
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response)
    }
    query.skip = size * (pageNo - 1);
    query.limit = size;
    query.sort = { date: -1};;
    News.find({},'title body date author -_id',query).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.status(400).send(err);
    })
})
module.exports = router;