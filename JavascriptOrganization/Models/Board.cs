using System.Collections.Generic;

namespace JavascriptOrganization.Models
{
    public class Board
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual IEnumerable<Task> Tasks { get; set; }
    }
}
