using System;
using System.ComponentModel.DataAnnotations;

namespace ERP.API.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public byte[] PasswordHash { get; set; }
        [Required]
        public byte[] PasswordSalt { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public double Salary { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int PositionId { get; set; }
        public Position Position { get; set; }
        public System.Nullable<DateTime> Created { get; set; }
        public System.Nullable<DateTime> LastUpdated { get; set; }

        [Timestamp] 
        public byte[] Timestamp { get; set; } 

    }
}