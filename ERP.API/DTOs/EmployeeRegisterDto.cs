using System;

namespace ERP.API.DTOs
{
    public class EmployeeRegisterDto
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public double Salary { get; set; }
        public int PositionId { get; set; }
    }
}