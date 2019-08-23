const {Earning} = require('../../models/earnings');
const {Account} = require('../../models/account');

function chargeAccount(account,amount, reason){
    return Account.findOneAndUpdate({_id: account._id, isMain: true},{"$inc": {"currentBalance": -amount}})
    .then(()=>{
        const earnings = new Earning({
            source: reason,
            cost: _.sumBy(fees,'cost')
        });
        return earnings.save();
    })
    .catch((err)=>{
        return err;
    })
}
exports.chargeRoulette = chargeRoulette;