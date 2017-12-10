$(document).ready(function() {

var intervalId;
var noClicks = false;
var itemClicked = "";
var gamesWon = 0;
var gamesLost = 0;
var gamesUndecided = 0;
var gameNo = 0;
var number = 10;
var interGameno = 5;
var games = [{

      "question": "Name the hit The Rolling Stones song that was written by The Beatles.",
      "choices": ["As Time Goes By","Fade Away","I Want To Be Your Man","Do You Want To Know A Secret?"],
      "answer": "2",
      "trivia": "The Beatles later recorded the song with Ringo as the lead vocal"

    },{
      "question": "At one time Jimi Hendrix was a member of this band",
      "choices": ["The Yardbirds","Spencer Davis Group","Vanilla Fudge","Joey Dee and the Starliters"],
      "answer": "3",
      "trivia": "Besides Jimi Hendrix, The Joey Dee Band also had several members of the Young Rascals"

    },{
      "question": "What Band sold the most records in 1967.",
      "choices": ["The Beatles","The Rolling Stones","The Monkees","The Doors"],
      "answer": "2",
      "trivia": "The Monkees - in fact they sold more records than the Beatles and Rolling Stones combined"

    },{
      "question": "Frank Sinatra recorded only one song written by the Beatles. That Was",
      "choices": ["Yesterday","Something","in My Life","Nowhere Man"],
      "answer": "1",
      "trivia": "George Harrison's Something - which made Lennon and McCartney very jealous."
    },{
      "question": "Name the 70's group that has a main vocialist who played the flute",
      "choices": ["Moody Blues","Jethro Tull","Traffic","Led Zeppelin"],
      "answer": "1",
      "trivia": "The singers' name was Ian Anderson of Jethro Tull"
     },{
      "question": "This famous band of the 70's were originally called 'The Golliwoggs",
      "choices": ["Grateful Dead","Jefferson Airplane","Creedence Clearwater Revival","The Hollies"],
      "answer": "2",
      "trivia": "The singers' name was Ian Anderson of Jethro Tull"
    }  


    ]

var numberOfGames = games.length
$('.QBox').hide();
$('.result').hide()

$(document).on("click", ".startButton", function() {
    $(".startButton").hide();
    displayGame();
})

$(document).on("click", ".pushButton", function(response) {

     console.log("im clicked "+noClicks+" "+response)
    // The following will turn off click while game is in pause mode
    if(noClicks) return;

    // get the number of the selection picked and put the game in pause mode
    itemClicked = response.currentTarget.dataset.buttonno;

    // find if selection is correct
    resultDisplay = "";
    if(itemClicked == games[gameNo].answer) {
        stop('won')
    } else {
        stop('lost');
    }
})

function displayGame() {

		// clear previous Game
    interGameno = 5;
    gameNo = ((gameNo + 1) -1)  // need to start at zero
		$('.QBox').empty();
    $('.QBox').show();
		$('.result').hide();
		$('.question').text(games[gameNo].question);
//		$('.result').text(games[gameNo].trivia);
    
    for (var i = 0; i < 4; i++) {
        answerWrap = $("<BUTTON>");
        answerWrap.addClass("pushButton");
        answerWrap.html(games[gameNo].choices[i]);  
        answerWrap.attr("data-buttonno", i);
        $(".choiceBox").append(answerWrap);
    }

    number = 10;
    run();

}

// this function sets the timer for the question to be solved
function run() {
 //     noClicks = true;
      intervalId = setInterval(decrement, 1000); 
}

function decrement() {
      number--;
      $(".show-number").html("<h4>Seconds Remaining :"+number + "</h4>");

      if (number === 0) {
          stop('un');          
      }
}

//----------------------------------
// this function sets the timer to pause the between Games
function interGametimer() {
      interGame = setInterval(interGamedec, 1000);
}

function interGamedec() {

      interGameno--;
      if (interGameno === 0) {       
          clearInterval(interGame);
          gameNo += 1

          if(gameNo == numberOfGames) {
              $('.QBox').empty();
              $('.question').empty();
              $('.result').empty();
              mess = $('<p>');
              mess.append("Game Over<br>")
              mess.append("Games Won  "+gamesWon+"<br>");
              mess.append("Games Lost "+gamesLost+"<br>");
              mess.append("Games Undecided   "+gamesUndecided)
              $('.question').append(mess);
          } else {
             displayGame()
          }          
      }
}
//----------------------------------


function stop(mode) {

      displayAnswer(mode);
      clearInterval(intervalId);    
     //  gameNo += 1
     //  displayGame();
}

// the following function will etermine how to display the result (won lost time out)

function displayAnswer(mode) {
      $('.result').empty();
      switch(mode) {
        case 'un':
             $('.result').addClass('badAnswer');
             $('.result').html('Sorry - you ran out of time<br>')
             $('.result').append('The correct answer is<br>'+games[gameNo].choices[games[gameNo].answer]+"<br>");
             $('.result').show();
             gamesUndecided += 1;
             break;
        case 'lost':
             $('.result').addClass('badAnswer');
             $('.result').html('Sorry - That is not the correct answer<br>')
             $('.result').append('The correct answer is<br>'+games[gameNo].choices[games[gameNo].answer]+"<br>");
             $('.result').show();
             gamesLost += 1;
             break;
        case 'won':
             $('.result').addClass('goodAnswer');     
             $('.result').append('That is the correct Answer<br>'+games[gameNo].choices[games[gameNo].answer]+"<br>");
             $('.result').show();
             gamesWon += 1
             break;
             
      }

interGametimer();


     
}

}) //ready