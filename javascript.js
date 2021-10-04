
var loc = document.getElementById("loc");
var button = document.querySelector('.button');
var inputValue = document.querySelector('.inputValue');
var cityName = document.querySelector('.cityName');
var description = document.querySelector('.description');
var temp = document.querySelector('.temp');
var button3 = document.querySelector('.button3');
    


//Gör så att Gävle är default när man går in på hemsidan
fetch('https://api.openweathermap.org/data/2.5/weather?q=Gävle&appid=1bd706c9a238fc481e5f0a1a10c5e7fd&units=metric')
.then(response => response.json())
.then(data =>{
    var nameValue = data ['name'];
    var tempValue = data['main']['temp'];
    var descValue = data['weather'][0]['description'];
    cityName.innerHTML = nameValue;
    var tValue= Math.round(tempValue);
    temp.innerHTML = tValue + "°C";
    description.innerHTML = descValue; 
    
        //Tid i gävle
        var today = new Date();
        var date = today.getFullYear() + '/' + (today.getMonth()+1) + '/' + today.getDate();
        var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        var dateTime = date+ ' '+ time;
        loc.innerHTML =  dateTime; 

});

//Knapp med funktion som visar nuvarande väder enligt stad, tar värdet från inputValue och skickar in som stadsnamnet till APIn
button.addEventListener('click', function(){
fetch('https://api.openweathermap.org/data/2.5/weather?q='+ inputValue.value +'&appid=1bd706c9a238fc481e5f0a1a10c5e7fd&units=metric')
.then(response => response.json())
.then(data =>{
    
    loc.innerHTML = "";
    var nameValue = data ['name'];
    var tempValue = data['main']['temp'];
    var descValue = data['weather'][0]['description'];
    cityName.innerHTML = nameValue;
    var tValue= Math.round(tempValue);
    temp.innerHTML = tValue + "°C";
    description.innerHTML = descValue; 

})
//Skickar iväg felmeddelanden när programmet inte fungerar
.catch(error => alert("Något gick fel! Prova igen."))
})
//Väderikoner, termometrar, fontawesome5
var ic = '<i class="fas fa-thermometer-half" style="font-size:23px; padding: 6px;"></i>';
var ic2 = "<i class='fas fa-temperature-high' style='font-size:23px; color:red;padding: 6px;'></i>";
var ic3 = "<i class='fas fa-temperature-low' style='font-size:23px; color:aqua;padding: 6px;'></i>";

//Knapp med funktion som visar väder 5 dagar framåt
button3.addEventListener('click', function(){
    //Rensar div:en 
    document.getElementById('display2').innerHTML="";
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+ inputValue.value +'&appid=6f0c6f887a222485c0e24b0df372e087&units=metric')
        .then((response) => response.json())
        .then((data) => {
          const newData = data.list;
          console.log(newData);
          const filteredData = newData.filter((f) => f.dt_txt.includes("09:00:00"));     
          filteredData.map((m) => {
            document.querySelector(".display2").innerHTML +=
            "<div >" +
            "<h3>" + data.city.name +"</h3>" +
            "<h6>" + m.dt_txt  + "</h6>" + 
            "<img src='http://openweathermap.org/img/wn/"+  m.weather[0].icon +"@2x.png'>"+"</img>"+
            "<p>"  + ic +m.main.temp +"°C" +"</p>" +
            "<p>" + ic2 + m.main.temp_max +"°C" +"</p>" +
            "<p>" +ic3+m.main.temp_min +"°C" +"</p>" +
            "</div>";
        });
    });
});



            

