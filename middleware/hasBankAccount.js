const {Account} = require('../models/account');
module.exports = function (req, res, next) {
    Account.findOne({denovId: req.user, isMain: true})
    .then(account=>{
        if(account && account.status == "created"){
            req.account = account;
            next();
        }else{
            res.status(400).send('Denov main bank account not found');
        }
        
    })
    .catch(err=>{
        res.status(400).send(err);
    })

}