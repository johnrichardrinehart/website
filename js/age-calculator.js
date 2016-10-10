function calculateAge(){
   var birthDate = new Date(1991,06,02);
   var secondDate = new Date();
   var diff = secondDate.getTime() - birthDate.getTime(); // milliseconds
   return ms2years(diff)
}

function ms2years(ms) {
   // convert milliseconds to years
   var x = ms / 1000; // seconds
   var seconds = x % 60;
   x /= 60; // sec -> minutes
   var minutes = x % 60;
   x /= 60; // minutes -> hours
   var hours = x % 24;
   x /= 24; // hours -> days
   var days = x % 30;
   var dayspermonth = (365*3/4)/12 + (366*1/4)/12; // Weighted avg
   x /= dayspermonth; // days -> months
   var months = x % 12;
   var years = x / 12;
   return {days: days, months: months, years: years}
}

age = calculateAge();

document.getElementById("age").innerHTML = age.years.toString().slice(0,4) 
