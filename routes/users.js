var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/login');
});
router.post('/signin',function (req,res) {
    var username = req.body.username;
    var pwd = req.body.pwd;
    monogoClient.connect(DB_STR,function (err,client) {
        if(err){
          res.send(err)
            return;
        }
        var db =client.db('myboke')
        var c = db.collection("users");
        c.find({username:username,ped:ped}).toArray(function (err,docs) {
            if(err){
              res.send(err)
                return;
            }
            if(docs.length){
              req.session.isLogin = true;
              res.redirect('/admin/index')
            }else{
              res.redirect('/admin/users')
            }
        })
    })
})
router.get('/logout',function (req,res) {
    req.sesion.isLogin = null;
    res.redirect('/admin/users')
})
module.exports = router;
