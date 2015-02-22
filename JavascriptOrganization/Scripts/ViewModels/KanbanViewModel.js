define(['ko', 'Board'], function (ko, Board) {
    return function (todoArray, inProgressArray, completeArray) {
        var self = this;
        this.todoBoard = new Board('To Do', todoArray);
        this.inProgressBoard = new Board('In Progress', inProgressArray);
        this.completeBoard = new Board('Complete', completeArray);
        this.newTaskName = ko.observable('');
        this.addNewTask = function () {
            var taskName = self.newTaskName();
            if (taskName) {
                self.todoBoard.addTask({ title: taskName });
                self.newTaskName('');
            }
        };
        this.totalTasks = ko.computed(function () {
            return self.todoBoard.numTasks() + self.inProgressBoard.numTasks() + self.completeBoard.numTasks();
        });
        this.percentComplete = ko.computed(function () {
            if (self.totalTasks() === 0) {
                return 0;
            } 
            return Math.floor(self.completeBoard.numTasks() / self.totalTasks() * 100);
        });
    };
});