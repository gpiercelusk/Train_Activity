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



  var trainObj;

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

    console.log(newTrain.name);
    console.log(newTrain.circle);
    console.log(newTrain.frequency);
    console.log(newTrain.first);

    clearInput();
  };


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

  $("table").on("click", function (event) {
    $(this).closest("tr").remove();
    alert("Train moved to Purgatory...");
  });

  database.ref().on("child_added", function (snapshot) {
    var name = snapshot.val().name;
    var cir = snapshot.val().circle;
    var freq = parseInt(snapshot.val().frequency);
    var first = snapshot.val().first;
    var howOften = freq;
    var initialTrain = first;

    var convertTime = moment(first, "HH:mm").subtract(1, "years");
    console.log(convertTime);
    var current = moment();

    $("#time-now").html("Current time is: " + current.format("hh:mm a"));

    var timeDiff = moment().diff(moment(convertTime), "minutes");
    console.log(timeDiff);

    var remaining = timeDiff % howOften;

    var minutesRemaining = howOften - remaining;

    var next = moment().add(minutesRemaining, "minutes");

    var arrival = moment(next).format("hh:mm a");
    console.log(arrival);

    var deleteTrain = "X";

    $("tbody").append("<tr><td><button>" + deleteTrain + "</button></td><td>" + name + "</td><td>" + cir + "</td><td>" + freq + "</td><td>" + arrival + "</td><td>" + remaining + "</td></tr>");
  });
});
