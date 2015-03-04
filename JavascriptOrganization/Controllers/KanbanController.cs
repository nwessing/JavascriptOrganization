using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using JavascriptOrganization.Models;

namespace JavascriptOrganization.Controllers
{
    public class KanbanController : ApiController
    {
        public static IList<Board> _boards = new List<Board>
        {
            new Board
            {
                Id = 1,
                Name = "JS ORG",
                Tasks = new []
                {
                    new Task
                    {
                        Type = TaskType.Todo,
                        Description = "Need to start"
                    },
                    new Task
                    {
                        Type = TaskType.InProgress,
                        Description = "Working on it"
                    },
                    new Task
                    {
                        Type = TaskType.Complete,
                        Description = "Finished"
                    }
                }
            }
        };

        [HttpGet]
        [Route("api/kanban/board/{id}")]
        public Board Get(int id)
        {
            return _boards.FirstOrDefault(x => x.Id == id);
        }

        
        [HttpGet]
        [Route("api/kanban/allboards")]
        public IEnumerable<BoardDescription> AllBoards()
        {
            return _boards.Select(x => new BoardDescription
            {
                Id = x.Id,
                Name = x.Name
            }).ToList();
        }

        [HttpPost]
        [Route("api/kanban/board")]
        public Board Post(Board board)
        {
            var existing = _boards.FirstOrDefault(x => x.Id == board.Id);
            if (existing != null)
            {
                _boards.Remove(existing);
            }

            if (board.Id <= 0)
            {
                board.Id = _boards.Max(x => x.Id) + 1;
            }

            _boards.Insert(0, board);

            return board;
        }
    }
}