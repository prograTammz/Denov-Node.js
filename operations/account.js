const {Earning} = require('../models/earnings');
const {Account} = require('../models/account');

function chargeAccount(account,amount, reason){
    return Account.findOneAndUpdate({_id: account._id, isMain: true},{"$inc": {"currentBalance": -amount}})
    .then(()=>{
        const earnings = new Earning({
            source: reason,
            cost: amount
        });
        return earnings.save();
    })
    .catch((err)=>{
        return err;
    })
}

function fillAccount(account,amount,reason){
    return Account.findOneAndUpdate({_id: account._id, isMain: true},{"$inc": {"currentBalance": amount}})
    .then(()=>{
        const earnings = new Earning({
            source: reason,
            cost: -amount
        });
        return earnings.save();
    })
    .catch((err)=>{
        return err;
    })
}
exports.fillAccount = fillAccount;
exports.chargeAccount = chargeAccount;