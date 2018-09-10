namespace ERP.API.DTOs.EmployeeDtos
{
    public class EmployeeListDto
    {
        public int EmployeeId { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PositionName { get; set; }
    }
}