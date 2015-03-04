define(['ko', 'KanbanBoard', 'KanbanApi'], function (ko, KanbanBoard, KanbanApi) {
	return function () {
		this.kanbanBoard = ko.observable(new KanbanBoard([], [], [], null));
		this.boards = ko.observableArray([]);
        this.boardId = ko.observable(0);
        this.boardName = ko.observable('');

        this.loadBoards = function () {
            return KanbanApi.getBoards().done(function (boards) {
                this.boards(boards);
            }.bind(this));
        };
        this.loadBoards();

        ko.computed(function () {
            var boardId = this.boardId();
            if (boardId) {
                KanbanApi.getBoard(boardId).then(function (board) {
                    var todos = _.filter(board.Tasks, { Type: 1 });
                    var inProgess = _.filter(board.Tasks, { Type: 2 });
                    var complete = _.filter(board.Tasks, { Type: 3 });
                    this.boardName(board.Name);
                    this.kanbanBoard(new KanbanBoard(todos, inProgess, complete, save.bind(this)));
                }.bind(this));
            }
        }, this).extend({rateLimit: 0});

        this.newBoard = function () {
            var boardName = window.prompt("Please enter a name for your kanban board:");
            KanbanApi.saveBoard({
                Id: 0,
                Name: boardName,
                Tasks: []
            }).then(function (board){
                this.loadBoards().then(function () {
                    this.boardId(board.Id);    
                }.bind(this));
            }.bind(this));
        };

        function save () {
        	var board = this.kanbanBoard();
            var data = {
                Id: this.boardId(),
                Name: this.boardName(),
                Tasks: board.todoBoard.tasks().map(function (task) {
                    task.Type = 1;
                    return task;
                }).concat(board.inProgressBoard.tasks().map(function (task) {
                    task.Type = 2;
                    return task;
                })).concat(board.completeBoard.tasks().map(function (task) {
                    task.Type = 3;
                    return task;
                }))
            };

            KanbanApi.saveBoard(data).then(function (data) {
                this.boardId(data.Id);
            }.bind(this));
        }
	};
});