var Task = function(fn) {
    this.fn = fn
}

var QueueManager = function() {
    this.queue = [];
    this.ready = true;
    this.queue_size

    this.add = function(task) {

        if(this.queue.length > this.queue_size) {
            this.last();
        }

        this.queue.push(task);
        
        if(this.ready) {
            this.last();
            this.ready = false;
        }
    }

    this.remove = function() {
        this.queue.shift();
    }

    this.length = function() {
        return this.queue.length;
    }

    this.run = function() {
        if(this.queue.length > 0) {
            this.queue[0].fn();
            this.remove();
            this.run();
        }
    }

    this.last = function() {
        var task = this.queue.pop();
        if(typeof(task) === 'object' && typeof(task.fn) === 'function') task.fn();
        this.clear();
        //if(this.queue.length > 0) this.last();
    }

    this.clear = function() {
        this.queue = [];
    }
}

cue = new QueueManager();
