var express = require('express');
var formidable = require('formidable');
const ipfsAPI = require('ipfs-api');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
const ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'});
const Mallet = require('@iohk/mallet/lib/mallet.js');
const path = require('path');
const os = require('os');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const sleep = require('sleep');
const mallet = new Mallet('iele', path.join(os.homedir()));

app.use(express.static('./'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', function (req, res){
    res.sendFile(__dirname + '/public/index.html');
});


app.post('/', upload.single('upload'), function (req, res){

    var name = req.body.name;
    var email = req.body.email;
    var phonenumber = req.body.phonenumber;
    var institution = req.body.institution;

    console.log("name " +name+ "\nemail " +email+ "\nphone number " +phonenumber+ "\ninstitution " +institution);
    
    ipfs.files.add(fs.readFileSync(req.file.path), function (err, file) {
        if (err) {
          console.log(err);
        }
        var hashFile = file[0].hash;
        var pathFile = file[0].path;
        var sizeFile = file[0].size;

        const password = 'samid oitesarp';
        const listAccount = mallet.listAccounts();
        const account = mallet.selectAccount(listAccount[0]);
        mallet.selectAccount(account);
        const fName = 'write(string,string,string,string,string)';
        const args = [name, email, phonenumber, institution, hashFile];
        const types = ['string', 'string', 'string', 'string', 'string'];
        const encodedArgs = args.map((v, i) => mallet.iele.enc(v, types[i]));   

        const calledFunction =  mallet.iele.callContract({to: '0x0d21e35ada8bce37341ffd5949f0063df9e2fa41', gas: 1000000, func: fName, args: encodedArgs}, password);
        const callReceipt = awaitReceipt(calledFunction);

        console.log(callReceipt);

        console.log(file);
    });

    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000);

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