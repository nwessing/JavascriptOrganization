define(['ko', 'underscore', 'TaskBoard', 'KanbanApi'], function (ko, _, TaskBoard, KanbanApi) {
    return function (todoArray, inProgressArray, completeArray, onChange) {
        this.todoBoard = new TaskBoard('To Do', todoArray);
        this.inProgressBoard = new TaskBoard('In Progress', inProgressArray);
        this.completeBoard = new TaskBoard('Complete', completeArray);
        this.newTaskName = ko.observable('');

        this.addNewTask = function () {
            var taskName = this.newTaskName();
            if (taskName) {
                this.todoBoard.addTask({ Description: taskName });
                this.newTaskName('');
            }
        };

        this.totalTasks = ko.computed(function () {
            return this.todoBoard.numTasks() + this.inProgressBoard.numTasks() + this.completeBoard.numTasks();
        }, this);
        
        this.percentComplete = ko.computed(function () {
            if (this.totalTasks() === 0) {
                return 0;
            } 
            return Math.floor(this.completeBoard.numTasks() / this.totalTasks() * 100);
        }, this);

        var onChangeEventInitialized = false;
        ko.computed(function () {
            this.todoBoard.tasks();
            this.inProgressBoard.tasks();
            this.completeBoard.tasks();
            if (onChangeEventInitialized && typeof onChange === 'function') {
                onChange();
            }
            onChangeEventInitialized = true;
        }, this).extend({rateLimit: 0});
    };
});