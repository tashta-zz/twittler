var allTweets = true;
window.streams.users['tatiana-andreas']=[];
var userTweets = 0;
var stop;
var userIndiv;

var draw = function(){
  var stream = window.streams.home;
  newTweets = 0;
  $('.backButton').hide();
  $('.newTweetsCount').text(0);
  $("#tweet-log").html("");
  addTweets(stream);
};

var drawIndiv = function(userIndiv){
  var stream = window.streams.users[userIndiv];
  $('.backButton').show();
  $("#tweet-log").html("");
  addTweets(stream);
};

var addTweets = function(stream, start){
  start = start || stream.length - 1
  var logLen = countLength(start);
  for(var i = start; i >= start-logLen; i--){
    $("#tweet-log").append(composeTweet(stream[i]));
  }
  stop = start+1-logLen;
};

var composeTweet = function(tweet){
  var tweetTime = moment(tweet.created_at);
  var currentTime = moment();
  var tweetTimeAgo = tweetTime.from(currentTime);
  return "<div class='userName' style='cursor: pointer;'>" + tweet.user + "</div>"  + "<div class='userMSG'>" + tweet.message + "</div>" + " " + "<div class='timeStamp'>" + tweetTimeAgo + "</div><br>";
};

var countLength = function(start){
  if (start<20){
    $('.oldTweets').hide();
    return start;
  } else {
    $('.oldTweets').show();
    return 20;
  }
};

var outputLog = function(){
  if (allTweets){
    draw();
  } else {
    drawIndiv();
  }
}();

setInterval(function(){
  $('.newTweetsCount').text(newTweets);
  }, 2000);


$(document).ready(function(){

  $('#tweetButton').click(function(){
    var tweet = {
      user:"tatiana-andreas",
      message:$('#newTweet').val(),
      created_at: new Date()
    };
    window.streams.home.push(tweet);
    window.streams.users['tatiana-andreas'].push(tweet);
    allTweets = true;
    draw();
    $('#newTweet').val('');
    userTweets+=1;
    $('.userTweetsCount').text(userTweets);
  });

  $(document).on('click', '.userName', (function(){
    allTweets = false;
    userIndiv=$(this).html();
    drawIndiv(userIndiv);
  }));

  $(document).on('click', '.backButton', (function(){
    allTweets = true;
    draw();
  })); 

  $(document).on('click', '.showNewTweets', (function(e){
    e.preventDefault();
    allTweets = true;
    draw();
  }));

  $(document).on('click', '.showOldTweets', (function(e){
    e.preventDefault();
    if (allTweets){
      addTweets(window.streams.home, stop);
    } else {
      addTweets(window.streams.users[userIndiv], stop);
    }
  }));

});




