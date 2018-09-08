using System.Collections.Generic;
using System.Threading.Tasks;
using ERP.API.Models;

namespace ERP.API.Data
{
    public interface IAuthRepository
    {
        Task<IEnumerable<Position>> GetPositions();
        Task<Employee> Register(Employee employee, string password);
        Task<Employee> Login (string email, string password);
        Task<bool> EmployeeExists(string email);
        Task<IEnumerable<EmployeeRole>> GetEmployeeRoles(int employeeId);
        Task<Role> GetRoles();
    }
}