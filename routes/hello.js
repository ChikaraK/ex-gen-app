var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var mysql_setting = {
	host	 : 'localhost',
	user	 : 'root',
	password : '',
	database : 'my-nodeapp-db'
};

router.get('/',(req,res,next) => {
	//コネクションの作成
	var connection = mysql.createConnection(mysql_setting);
	//コネクションの実行（データベースに接続）
	connection.connect();
	//データを取り出す
	connection.query('SELECT * from mydata',
		(error,results,fields) => {
			// データベースアクセス時の処理
			if(error == null){
				var data = {title:'mysql',content:results};
				res.render('hello/index',data);
			}
		});
	connection.end();
});

router.get('/add',(req,res,next)=>{
	var data = {
		title:'HEllo/add',
		content:'新しいレコードを入力'
	}
	res.render('hello/add',data);
});

router.post('/add',(req,res,next)=>{
	var nm = req.body.name;
	var ml = req.body.mail;
	var ag = req.body.age;
	var data = {'name':nm,'mail':ml,'age':ag};

	var connection = mysql.createConnection(mysql_setting);
	//コネクションの実行（データベースに接続）
	connection.connect();

	connection.query('insert into mydata set ?',data,
		function(error,results,fields){
			res.redirect('/hello');
		});
	connection.end();
});

router.get('/show',(req,res,next)=>{
	var id = req.query.id;

	var connection = mysql.createConnection(mysql_setting);
	connection.connect();

	connection.query('select * from mydata where id = ?', id,
		function(error,results,fields){
			if(error == null){
				var data = {
					title:"Hello/show",
					content:"id = " + id + 'のレコード',
					mydata: results[0]
				}
			res.render('hello/show',data)
			}
		});
	connection.end();
});

router.get('/edit',(req,res,next)=>{
	var id = req.query.id;

	var connection = mysql.createConnection(mysql_setting);
	connection.connect();

	connection.query('select * from mydata where id = ?', id,
		(error,results,fields) =>{
			if(error == null){
				var data ={
					title:"hello/edit",
					content:'id = ' + id + "のレコード",
					mydata:results[0]
				}
			}
			res.render('hello/edit',data);
		})
});

router.post('/edit',(req,res,next)=>{
	var id = req.body.id;
	var nm = req.body.name;
	var ml = req.body.mail;
	var ag = req.body.age;
	var data = {'name':nm,'mail':ml,'age':ag};

	var connection = mysql.createConnection(mysql_setting);

	connection.connect();

	connection.query('update mydata set ? where id = ?',
		[data, id], (error,results,fields) => {
			res.redirect('/hello');
		});
	connection.end();
})

router.get('/delete',(req,res,next) => {
	var id = req.query.id;

	var connection = mysql.createConnection(mysql_setting);
	connection.connect();

	connection.query('select * from mydata where id = ?',id,
		(error,results,fields)=>{
			if(error == null){
				var data = {
					title:"hello/delete",
					content:'id =' + id + "のレコード",
					mydata:results[0]
				}
			}
			res.render('hello/delete',data)
		});
	connection.end();
});

router.post('/delete',(req,res,next) =>{
	var id = req.body.id;

	var connection = mysql.createConnection(mysql_setting);
	connection.connect();

	connection.query('delete from mydata where id = ?',
		id, (error,results,fields) => {
			res.redirect('/hello');
		});
	connection.end();
});

module.exports = router;