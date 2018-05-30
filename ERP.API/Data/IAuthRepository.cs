using System.Threading.Tasks;
using ERP.API.Models;

namespace ERP.API.Data
{
    public interface IAuthRepository
    {
        Task<Employee> Register(Employee employee, string password);
        Task<Employee> Login (string email, string password);
        Task<bool> EmployeeExists(string email);
    }
}