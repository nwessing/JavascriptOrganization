define(['ko'], function (ko) {
	return function Board (name, tasks) {
	    this.name = ko.observable(name);
	    this.tasks = ko.observableArray(tasks);
	    this.numTasks = ko.computed(function () {
	        return this.tasks().length;
	    }, this);
	    this.addTask = function (task) {
	        this.tasks.push(task);
	    }.bind(this);
	    this.removeTask = function (task) {
	        this.tasks.remove(task);
	    }.bind(this);
	};
});