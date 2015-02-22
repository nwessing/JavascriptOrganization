define(['ko'], function (ko) {
	return function Board (name, tasks) {
	    var self = this;
	    self.name = ko.observable(name);
	    self.tasks = ko.observableArray(tasks);
	    self.numTasks = ko.computed(function () {
	        return self.tasks().length;
	    });
	    self.addTask = function (task) {
	        self.tasks.push(task);
	    };
	    self.removeTask = function (task) {
	        self.tasks.remove(task);
	    };
	};
});