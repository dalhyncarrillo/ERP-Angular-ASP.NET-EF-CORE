using System;
using System.Collections.Generic;

namespace ERP.API.Models
{
    public class Position
    {
        public int PositionId { get; set; }
        public string PositionName { get; set; }
        public ICollection<Employee> Employees { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}