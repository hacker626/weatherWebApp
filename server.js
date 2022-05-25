const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }))
https  = require("https");
var temp1;

app.get("/",function(request,response){
  response.sendFile(__dirname+"/index.html");

});
app.post("/",function(request,response){
  console.log(request.body.city2);
  var data1 = request.body.city1;
  var data2 = request.body.city2;
  data = data2;
  //response.send(data);

  if(data2.length == 0){
    data = data1;
  }
  console.log(data)


  const url ="https://api.openweathermap.org/data/2.5/weather?q="+data+"&appid=2318a54f29a31feac828839b1d2d9967&units=metric"
data1 = data;

  https.get(url,function(res){
    console.log(res.statusCode);
    res.on("data",function(data){
      const weather = JSON.parse(data);
      var temp = weather.weather[0].description;
      var iconcode = weather.weather[0].icon;

      console.log(iconcode);

      var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
      console.log(iconurl);




      response.write("<body style = 'width:80%;background:#F6F6F6;margin:auto'><h1 style = 'text-align:center;margin-top:1.5rem;'>___Weather Information___</h1><img style='width:20% ;height:auto' src='http://openweathermap.org/img/w/03n.png' alt='weather_conditions'></br><p>Temperature in "+data1+" is: " + weather.main.temp + " degree Celcius </br>Weather conditions: "+temp+"</p></body>");
      response.send();

      console.log(temp+"°C");
    });
  });

});



app.listen(3000,function(){
  console.log("Server successfully connected at port 3000 😅");
});
