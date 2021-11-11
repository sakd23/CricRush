const express=require("express");
const ejs=require("ejs");
const bodyParser=require("body-parser");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));
app.set('view engine','ejs');
let score=0;
let balls=12;
let lofted=[6,4,4,-1,4,6,-1,-1,6,4,6,3];
let attack=[4,-1,2,1,2,4,3,2,4,-1,2,4];
let defence=[1,2,2,1,1,-1,1,1,1,2,1,2];
let shot=0;
let over=[];
app.get("/",function(req,res){
  res.sendFile(__dirname+"/homepage.html");
});

app.get("/gameplay",function(req,res){
  res.render("gameplay",{score:score,balls:balls,shot:shot,over:over});
});

app.post("/shotPlay",function(req,res){
  let shotType=req.body.shot;
  if(shotType==="def")
  {
    outcome=defence;
  }
  else if(shotType==="att"){
    outcome=attack;
  }
  else{
    outcome=lofted;
  }
  let index=Math.random();
  index=12*index;
 index=Math.floor(index);
  if(outcome[index]===-1)
  {

    let ballsFaced=12-balls+1;

  res.render("wicket",{comment:"OUT",score:score,ballsFaced:ballsFaced});
  score=0;
  balls=12;
  over=[];
  }

else{
  score=score+outcome[index];
  --balls;
  if(balls===0){
    res.render("wicket",{comment:"Innings Over",score:score,ballsFaced:12});
    score=0;
    balls=12;
    over=[];
  }
  else{
    shot=outcome[index];
    over.push(shot);
    res.redirect("/gameplay");
     }


}

});

app.listen("3000",function(){
  console.log("server is up n running");
});
