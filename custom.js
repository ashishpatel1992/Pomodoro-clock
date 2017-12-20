$(document).ready(function(){
  console.log("I am ready!");
  //Controls Defaults
  let breakLen = 1;
  let sessionLen = 1;
  //let breakStatus = 0;
  let sessionStatus = 1; // We start with session First.
  let clickClock = 1; //clock is Off
  let clockCurrSec=0;
  $(".break-time").html(breakLen);
  $(".session-time").html(sessionLen);
  //Control Break
  $(".btn-break-add").click(function(){
    breakLen++;
    $(".break-time").html(breakLen);
  });
  $(".btn-break-sub").click(function(){
    if(breakLen > 1){
      breakLen--;
    $(".break-time").html(breakLen);
    }
  });
  //Control Session
    $(".btn-session-add").click(function(){
    sessionLen++;
    $(".session-time").html(sessionLen);
  });
  $(".btn-session-sub").click(function(){
    if(sessionLen > 1){
      sessionLen--;
    $(".session-time").html(sessionLen);
    }
  });
  // Conver Sec to Min
  let convertSecToMin = (seconds) => {
    var decMinute = seconds/60;
    var minute = Math.floor(decMinute);
    var decSecond = (decMinute-minute)*60;
    console.log(decSecond);
    console.log(("0"+Math.round(decSecond)).slice(-2));
    return ("0"+minute).slice(-2)+":"+("0"+Math.round(decSecond)).slice(-2);
  };
  // Convert Min to Sec
  let convertMinToSec = (minutes) => {
    return minutes*60;
  };
  //Starting Clock
  var clockInterval;
  $(".clock").click(function(){
    console.log("Clock Click");
    clickClock = 1 - clickClock;
    if(!clickClock){
      myClock.start();
      myClock.disableButtons();
    }else{
      myClock.pause();
      myClock.enableButtons();
    }
  });

  function runClock(totalRunTime){
    clockInterval = setInterval(function(){
      console.log(convertMinToSec(sessionLen) + "==" + clockCurrSec);
      //if(convertMinToSec(sessionLen) == clockSec){
      if(totalRunTime <= clockCurrSec){ //totalRunTime
        myClock.stop();
        sessionStatus = 1 - sessionStatus;
        myClock.start();
      }else{
         clockCurrSec++;
         myClock.updateUI(totalRunTime,clockCurrSec);
        $(".time").html(convertSecToMin(clockCurrSec));
      }

    },100);
  }
  var myClock = {
    breakLen: breakLen,
    sessionLen: sessionLen,
    start: () => {
      console.log("Clock Started");
      if(sessionStatus){
        console.log("Session");
        $(".pclock-title").html("SESSION");
        runClock(convertMinToSec(sessionLen));
      }else{
        console.log("Break");
        $(".pclock-title").html("BREAK");
        runClock(convertMinToSec(breakLen));
      }

    },
    stop: () =>{
      console.log("Clock Stopped");
      clearInterval(clockInterval);
      clockCurrSec = 0;
    },
    pause: () => {
      console.log("Clock Paused");
      clearInterval(clockInterval);
    },
    disableButtons: () => {
      $(".btn-break-add").prop("disabled",true);
      $(".btn-break-sub").prop("disabled",true);
      $(".btn-session-add").prop("disabled",true);
      $(".btn-session-sub").prop("disabled",true);
    },
    enableButtons: () => {
      $(".btn-break-add").prop("disabled",false);
      $(".btn-break-sub").prop("disabled",false);
      $(".btn-session-add").prop("disabled",false);
      $(".btn-session-sub").prop("disabled",false);
    },
    updateUI: (runTime,currTime) => {
      console.log("updatingUI");
      var glowBar = (currTime/runTime)*100;
      console.log(currTime+"/"+runTime);
      if(sessionStatus){
        $(".clock").attr("style",`background-image:-webkit-linear-gradient(bottom, #FFEE58, #FFEE58 ${glowBar}%, transparent 0%, transparent 100%)`);
      }else{
        $(".clock").attr("style",`background-image:-webkit-linear-gradient(bottom, #039BE5, #039BE5 ${glowBar}%, transparent 0%, transparent 100%)`);
      }

    }
  }





});
