
var URLSafeBase64 = require('urlsafe-base64');
var keyfile = require('./keystore.json');
var moment = require('moment');
let now = moment().format();



function getKEY(req, res) {
  
  var key = req.swagger.params.KvKey.value ;
  var i = 0;

  if(!URLSafeBase64.validate(key)) {
    res.json(400, {
      "message": "400"
    })
    return;
  }

  if(keyfile.key.indexOf(key) >= 0){
    res.json(200, {
      VALUE: key,
      TS: now,
    })
    return;
  }
  res.json(404, {
    "message": "key is not find"
  })
  
}

function deleteKEY(req, res) {
  
  var key = req.swagger.params.KvKey.value; 

  if(!URLSafeBase64.validate(key)) {
    res.json(400, {
      message: "400"
    })
  }

  var index = keyfile.key.indexOf(key);
  if(index >= 0){
    keyfile.key.splice(index,1)
    keyfile.value.splice(index,1)
    res.json(200, {
      OLD_VALUE:key,
      TS: now,
    })
    return;
  }
  res.json(200, {
    TS: now,
  })
    
}

function postKEY(req, res) {
  
  var key = req.swagger.params.KvKey.value;
  var val = req.swagger.params.body.value.VALUE;
  
  if(!URLSafeBase64.validate(key)) {
    res.json(400, {
      message: "QAQ",
    })
  }else{
    keyfile.key.push(key);
    keyfile.value.push(val);
    console.log(keyfile)
    res.json(200, {
      TS: now,
    })
  };
}

module.exports = {
  getKEY,
  deleteKEY,
  postKEY,
}