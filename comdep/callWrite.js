const Mallet = require('@iohk/mallet/lib/mallet.js');
const path = require('path');
const os = require('os');
const sleep = require('sleep');
const mallet = new Mallet('iele', path.join(os.homedir()));

function awaitReceipt(hash) {
    let h = hash;
    let rec = mallet.getReceipt(h);
    if (rec) {
      return rec;
    } else {
      console.log("awaiting receipt for " + h);
      sleep.sleep(5);
      return awaitReceipt(h);
    }
}

const callWrite = async () => {
    const password = 'samid oitesarp';
    const listAccount = mallet.listAccounts();
    const account = mallet.selectAccount(listAccount[0]);
    mallet.selectAccount(account);
    const fName = 'write(string,string,string,string,string)';
    const args = ['Dimas Prasetio', 'dprasetio6@gmail.com', '081585032050', 'emurgo indo', 'kjhzdfjhjdhgjkxg'];
    const types = ['string', 'string', 'string', 'string', 'string'];
    const encodedArgs = args.map((v, i) => mallet.iele.enc(v, types[i]));   

    const calledFunction =  mallet.iele.callContract({to: '0x0d21e35ada8bce37341ffd5949f0063df9e2fa41', gas: 1000000, func: fName, args: encodedArgs}, password);
    const callReceipt = awaitReceipt(calledFunction);
    console.log(callReceipt);
};
callWrite();