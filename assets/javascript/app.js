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

  // event.preventDefault();

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
    event.preventDefault();
    retreiveInputs();
    alert("New Train Successfully added... to hell!")
  });




});
