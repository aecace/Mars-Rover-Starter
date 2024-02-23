class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

   receiveMessage(message) {
      let messageObject = {
         message: message.name,
         results: []
      }

      for (let i=0; i<message.commands.length; i++) {
         if (message.commands[i].commandType === 'STATUS_CHECK') {
            messageObject.results.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}});
         } else if (message.commands[i].commandType === 'MODE_CHANGE') {
            messageObject.results.push({completed: true});
            this.mode = message.commands[i].value;
         } else if (message.commands[i].commandType === 'MOVE') {
            if (this.mode === 'LOW_POWER') {
               messageObject.results.push({completed: false});
            } else {
               messageObject.results.push({completed: true});
               this.position = message.commands[i].value;
            }
         }
      }

      return messageObject;
   }
}
 
module.exports = Rover;