var request = require('request');

function checkhex(req,res){
    
    var val = req.swagger.params.body.value.plaintext ;
    var url = "https://nkiua09s52.execute-api.ap-northeast-1.amazonaws.com/dev/encrypt"
    
    if(val.length > 32) {
        res.json(413, {
            message : "Entity Too Large"
        })
        return;
    }
    
    var reg =/[a-f\d]{0,32}/;
    if (!reg.test(val[i]) && val.length % 2 == 0){
        res.json(400, {
            message : "Bad Request"
        });
        return;
    }

    var options = { 
        method: 'POST',
        url: url,
        headers: { 'content-type': 'application/json' },
        body: { plaintext: val },
        json: true 
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.json(200, {
            ciphertext : body.ciphertext,
        })
    });
}


module.exports = {
  checkhex,
}