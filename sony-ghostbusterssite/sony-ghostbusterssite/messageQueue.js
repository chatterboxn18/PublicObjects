function Message(command, args){
    console.log(args)
    this.uniqueID = generateUUID();
    args["message-uid"] = this.uniqueID;

    var keys = Object.keys(args);

    //add a query if we have args
    if ( keys.length ) {
        command += "?";
        //for each arg, add a param
        keys.forEach(function( k, idx ) {
            command += k + "=" + args[k];
            if(idx < keys.length-1){
                command += "&";
            }
        });

    }

    this.data = command;
    this.recieved = false;
}

function MessageQueue(){
    this.messages = [];
    this.startIndex = 0;
}

MessageQueue.prototype.length = function(){
    return this.messages.length-this.startIndex;
}

MessageQueue.prototype.enqueue = function(messageString){
    this.messages.push(messageString);
}

MessageQueue.prototype.dequeue = function(){
    var message = this.messages[this.startIndex];
    if(this.startIndex < this.messages.length){
        this.startIndex++;
    }
    if(this.startIndex > Math.floor(this.messages.length/2) ){
        var len = this.messages.length;
        this.messages = this.messages.slice(this.startIndex, len);
        this.startIndex = 0;
        console.log("slicing message queue from "+this.startIndex+" to "+this.messages.length);
    }
    return message;
}

MessageQueue.prototype.first = function(){
    return this.messages[this.startIndex];
}

MessageQueue.prototype.isEmpty = function(){
    return this.length() == 0;
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};