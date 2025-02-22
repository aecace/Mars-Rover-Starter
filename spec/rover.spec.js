const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // Test 7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(100);
    expect(rover.position).toBe(100);
    expect(rover.mode).toBe('NORMAL');
    expect(rover.generatorWatts).toBe(110);
  });

  // Test 8
  it("response returned by receiveMessage contains the name of the message", function() {
    let rover = new Rover(100);
    let commands = [
      new Command('MOVE', 4321),
      new Command('STATUS_CHECK'),
    ];
    let message = new Message('Test 8', commands);
    let response = rover.receiveMessage(message);
    expect(response.message).toBe('Test 8');
  });

  // Test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let rover = new Rover(100);
    let commands = [
      new Command('MOVE', 4321),
      new Command('STATUS_CHECK')
    ];
    let message = new Message('Test 9', commands);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toBe(2);
  });
  
  // Test 10
  it("responds correctly to the status check command", function() {
    let rover = new Rover(100);
    let commands = [
      new Command('STATUS_CHECK')
    ];
    let message = new Message('Test 10', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].roverStatus.mode).toBe('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toBe(110);
    expect(response.results[0].roverStatus.position).toBe(100);
  });

  // Test 11
  it("responds correctly to the mode change command", function() {
    let rover = new Rover(100);
    let commands = [
      new Command('MODE_CHANGE', 'LOW_POWER')
    ];
    let message = new Message('Test 11', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(rover.mode).toBe('LOW_POWER');
  });
  
  // Test 12
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let rover = new Rover(100);
    let commands = [
      new Command('MODE_CHANGE', 'LOW_POWER'),
      new Command('MOVE', 4321)
    ];
    let message = new Message('Test 12', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[1].completed).toBe(false);
    expect(rover.position).toBe(100);
  });

  // Test 13
  it("responds with the position for the move command", function() {
    let rover = new Rover(100);
    let commands = [
      new Command('MOVE', 4321)
    ];
    let message = new Message('Test 13', commands);
    rover.receiveMessage(message);
    expect(rover.position).toBe(4321);
  });

});
 