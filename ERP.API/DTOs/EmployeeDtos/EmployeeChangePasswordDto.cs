namespace ERP.API.DTOs.EmployeeDtos
{
    public class EmployeeChangePasswordDto
    {
        public string Email { get; set; }
        public string currentPassword { get; set; }
        public string newPassword { get; set; }
    }
}