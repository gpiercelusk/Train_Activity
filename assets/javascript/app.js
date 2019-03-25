var config = {
  apiKey: "AIzaSyBQE3NvNl8Ey_CCRRoq6v8QpSCtcNLMR-Y",
  authDomain: "train-scheduler-600d7.firebaseapp.com",
  databaseURL: "https://train-scheduler-600d7.firebaseio.com",
  projectId: "train-scheduler-600d7",
  storageBucket: "train-scheduler-600d7.appspot.com",
  messagingSenderId: "656090633042"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("document").ready(function () {





  retreiveInputs = function () {
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var circle = $("#circle-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      circle: circle,
      frequency: frequency,
      first: firstTrain
    };

    database.ref().push(newTrain);

    clearInput();
  };

  //clears user input
  clearInput = function () {
    $("#train-name-input").val("");
    $("#circle-input").val("");
    $("#frequency-input").val("");
    $("#first-train-input").val("");
  };

  $("#add-train-btn").on("click", function (event) {
    // event.preventDefault();
    event.preventDefault();
    retreiveInputs();
    alert("New Train Successfully added... You're on the highway to HELL!");
  });

  $("table").on("click", "button", function () {
    $(this).closest("tr").remove();
    alert("Train moved to Purgatory...");
  });

  currentTime = function () {
    var current = moment().format("HH:mm:ss");
    $("#time-now").html("Current time is: " + current);
  };
  currentTime();
  setInterval(function () {
    currentTime();
  }, 1000);


  database.ref().on("child_added", function (snapshot) {
    var name = snapshot.val().name;
    var cir = snapshot.val().circle;
    var freq = parseInt(snapshot.val().frequency);
    var first = snapshot.val().first;
    var howOften = freq;


    var convertTime = moment(first, "HH:mm").subtract(1, "years");
    console.log(convertTime);

    var timeDiff = moment().diff(moment(convertTime), "minutes");
    console.log(timeDiff);

    var remaining = timeDiff % howOften;

    var minutesRemaining = howOften - remaining;

    var next = moment().add(minutesRemaining, "minutes");

    var arrival = moment(next).format("hh:mm a");
    console.log(arrival);

    var deleteTrain = "X";



    $("tbody").append("<tr><td><button>" + deleteTrain + "</button></td><td>" + name + "</td><td>" + cir + "</td><td>" + "every " + freq + " mins" + "</td><td>" + arrival + "</td><td>" + minutesRemaining + "</td></tr>");
  });

});
