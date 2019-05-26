var express = require('express');
var router = express.Router();

router.get('/',(req,res,next) => {
	var data = {
		title: 'Hello!',
		content: 'これはサンプルのコンテンツ,<br> This is samplel content'
	};
	res.render('hello',data);
});

module.exports = router;