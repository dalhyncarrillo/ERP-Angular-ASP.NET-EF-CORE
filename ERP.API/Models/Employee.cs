using System;

namespace ERP.API.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public double Salary { get; set; }
        public DateTime Created { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int PositionId { get; set; }
        public Position Position { get; set; }
        public DateTime LastUpdated { get; set; }

    }
}