// Your code goes here
const mongoose = require("mongoose");
const { resolve } = require("path");
const { kill } = require("process");
mongoose.connect("mogodb://localhost:27017/factory", {
  userNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));

const readline = require("readline");
const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(questionText) {
  return new Promise((resolve) => {
    readlineInterface.question(questionText, resolve);
  });
}
async function start() {
  const robotSchema = new mongoose.Schema({
    creatorName: String,
    robotName: String,
    robotColor: String,
    killer: Boolean,
    friend: Boolean,
    serialNumber: Number,
    data: Date,
  });
  const Robot = mongoose.model("robots", robotSchema);

  async function start() {
    const robotSchema = new mongoose.Schema({
      creatorName: String,
      robotName: String,
      robotColor: String,
      killer: Boolean,
      friend: Boolean,
      serialNumber: Number,
      date: Date,
    });

    const Robot = mongoose.model("robots", robotSchema);
    let action = await ask(
      "Welcome to the robot factory! What do you want to do?(Create, Read, Update or Delete)"
    );
  }
  start();

  if (action === "Create") {
    let creatorName = await ask("Who is the creator");
    let robotName = await ask("Designate this robot");
    let robotColor = await ask("What is the color of the robot");
    let friend = await ask("Is the Robot a friend? Please enter Y or N");
    let killer, serialNumber, date;

    if (friend === "Y") {
      friend = true;
      killer = false;
    } else {
      friend = false;
      killer = true;
    }
    serialNumber = await ask("What is the serial nubmer of the robot");
    date = new Date();

    await response.save();
    console.log("Your robot has been created");
  } else if (action === "head") {
    let allRobots = await Robot.find({});
    console.log(allRobots);
  } else if (action === "Update") {
    let allRobots = await Robot.find({});
    console.log(allRobots);
    let updateTarget = await ask(
      "What is the ID of the robot you want to update"
    );
    let updateField = await ask("What field do you want to update");
    let update = await ask("Enter a new value");
    await Robot.updateOne(
      { _id: updateTarget },
      { $set: { [updateField]: update } }
    );
    console.log("Your robot has been updated");
  } else if (action === "Delete") {
    let allRobots = await Robot.find({});
    console.log(allRobots);
    let target = await ask("What is the ID of the entry you want to delete");
    await Robot.deleteOne({ _id: target });
    console.log("Your entry has been deleted");
  } else {
    console.log("Invalid entry, Please Try again");
    process.exit();
  }
}
