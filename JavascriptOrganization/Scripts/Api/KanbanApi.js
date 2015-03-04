define(['jquery'], function ($) {
	function getBoard (id) {
		return $.get('/api/Kanban/Board/' + id);
	}
	
	function getBoards () {
		return $.get('/api/Kanban/AllBoards');
	}

	function saveBoard (board) {
		return $.post('/api/Kanban/Board/', board);
	}

	return {
		getBoard: getBoard,
		getBoards: getBoards,
		saveBoard: saveBoard
	};
});