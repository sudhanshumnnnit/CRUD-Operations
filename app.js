var express=require('express');
var app=express();
var mongojs=require('mongojs');
var bodyParser=require('body-parser');

var db=mongojs('studentDetails',['studentDetails']);
//app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// Task 1 for adding new student
app.post('/addNewStudent',function(req,res){
	console.log(req.body);
	
	db.studentDetails.insert(req.body,function(err,docs){
		if(!err){
			console.log('Student record is inserted into db successfully');
			res.json(req.body);
		}
	});
});

//Task 2 return student details by accepting studentid
app.get('/getStudentById/:id',function(req,res){
	var id=req.params.id;
	db.studentDetails.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
		if(!err){
			res.json(doc);
		}
	});
});

//Task 3 Get list of All the students 
app.get('/getAllStudents',function(req,res){
	db.studentDetails.find({},function(err,docs){
	res.json(docs);
	});
});


//Server is running on port 3000
app.listen(3000,function(){
	console.log('Server is running on port 3000');
})