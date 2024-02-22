const bodyparser= require("body-parser");
const express= require("express");
const ejs= require("ejs");
const mongoose= require("mongoose");
const app= express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');
mongoose.connect("mongodb://localhost:27017/wikidb", {useNewUrlParser: true, useUnifiedTopology: true });
const schema= {
  title: String,
  content: String
};
const Article = mongoose.model("article", schema);
/////////////////////////////////////////////request targetting all articles////
app.route("/articles")
.get(function(req,res){
  Article.find({},function(err,found){
    if(!err){
     res.send(found);
}
else{
  res.send(err);
}

  });
})
.post(function(req,res){
  const add= new Article({
    title:req.body.title,
    content: req.body.content
  });
  add.save(function(err){
    if(!err){
      res.send("saved succesfully");
    }
    else{
      res.send(err);
    }
  });
})
.delete(function(req,res){
  Article.deleteMany({},function(err){
    if(!err){
      res.send("deleted all");
    }
    else{
      res.send(err);
    }
  });
});
////////////////////////////////////////////////////////req targetting specific articles///
app.route("/articles/:kuchbhi")
.get(function(req,res){
  Article.findOne({title: req.params.kuchbhi},function(err,found){
if(found){
  res.send(found);
}
  else{
  res.send("nothing found");
  }
  });
})
.put(function(req,res){
  Article.update(
    {title: req.params.kuchbhi},
    {title: req.body.title,
    content: req.body.content},
  {overwrite: true},
function(err){
  if(!err){
    res.send("updated succesfully");
  }
});
})
.patch(function(req,res){
  Article.update({title:req.params.kuchbhi},
    {$set:req.body},
  function(err){
    if(!err){
      res.send("success patched");
    }
    else{
      res.send(err);
    }
  }
);
})
.delete(function(req,res){
  Article.deleteOne({title:req.params.kuchbhi},
  function(err){
    if(!err){
      res.send("succesfully deleted");
    }
    else{
      res.send(err);
    }
  });
});


app.listen(3000,function(){
  console.log("Server started");
});
