using System;

namespace ERP.API.DTOs.EmployeeDtos
{
    public class EmployeeDetailedDto
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public double Salary { get; set; }
        public string PositionName { get; set; }
        public int PositionId { get; set; }
        public byte[] Timestamp { get; set; } 
    }
}