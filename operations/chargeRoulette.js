const {Fees} = require('../../models/fees');
const {User} = require('../../models/users');
const {Earning} = require('../../models/earnings');
const {Account} = require('../../models/account');

function chargeRoulette(account,amount){
    return Account.findOneAndUpdate({_id: account._id, isMain: true},{"$inc": {"currentBalance": -amount}})
    .then(()=>{
        const earnings = new Earning({
            source:"CASINO:: Roulette deposit",
            cost: _.sumBy(fees,'cost')
        });
        return earnings.save();
    })
    .catch((err)=>{
        return err;
    })
}
exports.chargeRoulette = chargeRoulette;