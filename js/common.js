
<!--TABS-->
$(".tab_item").not(":first").hide();
$(".wrapper .tab").click(function() {
	$(".wrapper .tab").removeClass("active").eq($(this).index()).addClass("active");
	$(".tab_item").hide().eq($(this).index()).fadeIn()
}).eq(0).addClass("active");


<!--CAROUSEL -->
$(function() {
	$('#carousel').carouFredSel({
	width: '100%',
	items: {
		visible: 3,
		start: -1
		},
	scroll: {
		items: 1,
		duration: 1000,
		timeoutDuration: 2000
		}
	});
});
	

<!--Countdown flipTimer -->
$(document).ready(function() {
	$('.flipTimer').flipTimer({
	// count up or countdown
	direction: 'down',
	// the target <a href="http://www.jqueryscript.net/time-clock/">date</a>
	date: 'February 20, 2016 08:30:30',
	// callback works only with direction = "down"
	callback: function() { alert('times up!'); }
	});
	});

	
<!--Timer of being on the page-->
function Counter(initDate, id){
    this.counterDate = new Date(initDate);
    this.countainer = document.getElementById(id);
    this.numOfDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    this.borrowed = 0, this.years = 0, this.months = 0, this.days = 0;
    this.hours = 0, this.minutes = 0, this.seconds = 0;
    this.updateNumOfDays();
    this.updateCounter();
}
  
Counter.prototype.updateNumOfDays=function(){
    var dateNow = new Date();
    var currYear = dateNow.getFullYear();
    if ( (currYear % 4 == 0 && currYear % 100 != 0 ) || currYear % 400 == 0 ) {
        this.numOfDays[1] = 29;
    }
    var self = this;
    setTimeout(function(){self.updateNumOfDays();}, (new Date((currYear+1), 1, 2) - dateNow));
}
  
Counter.prototype.datePartDiff=function(then, now, MAX){
    var diff = now - then - this.borrowed;
    this.borrowed = 0;
    if ( diff > -1 ) return diff;
    this.borrowed = 1;
    return (MAX + diff);
}
  
Counter.prototype.calculate=function(){
    var futureDate = this.counterDate > new Date()? this.counterDate : new Date();
    var pastDate = this.counterDate == futureDate? new Date() : this.counterDate;
    this.seconds = this.datePartDiff(pastDate.getSeconds(), futureDate.getSeconds(), 60);
    this.minutes = this.datePartDiff(pastDate.getMinutes(), futureDate.getMinutes(), 60);
    this.hours = this.datePartDiff(pastDate.getHours(), futureDate.getHours(), 24);
    this.days = this.datePartDiff(pastDate.getDate(), futureDate.getDate(), this.numOfDays[futureDate.getMonth()]);
    this.months = this.datePartDiff(pastDate.getMonth(), futureDate.getMonth(), 12);
    this.years = this.datePartDiff(pastDate.getFullYear(), futureDate.getFullYear(), 0);
}
  
Counter.prototype.addLeadingZero=function(value){
    return value < 10 ? ("0" + value) : value;
}
  
Counter.prototype.formatTime=function(){
    this.seconds = this.addLeadingZero(this.seconds);
    this.minutes = this.addLeadingZero(this.minutes);
    this.hours = this.addLeadingZero(this.hours);
}
  
Counter.prototype.updateCounter=function(){
    this.calculate();
    this.formatTime();
    this.countainer.innerHTML =
        " " + this.minutes + "</strong>" + (this.minutes == 1? "" : "") +
        ":" + this.seconds + "</strong> " + (this.seconds == 1? "" : "");
    var self = this;
    setTimeout(function(){self.updateCounter();}, 1000);
}
 
window.onload=function(){ new Counter(((new Date()).getTime()+0), 'counter'); }
 