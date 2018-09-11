using System.Collections.Generic;
using System.Threading.Tasks;
using ERP.API.Models;

namespace ERP.API.Data
{
    public interface IAuthRepository
    {
        Task<IEnumerable<Position>> GetPositions();
        Task<Employee> Register(Employee employee, string password);
        Task<Employee> VerifyEmployee (string email, string password);
        Task<bool> EmployeeExists(string email);
        Task<IEnumerable<EmployeeRole>> GetEmployeeRoles(int employeeId);
        Task<EmployeeRole> GetSingleEmployeeRole(int employeeId, int roleId);
        Task<IEnumerable<Role>> GetRolesThatEmployeeNotHave(int employeeId);
        Task<T> Add<T>(T entity) where T: class;
        Task<bool> Delete<T>(T entity) where T: class;
        Task<bool> SaveChangesAsync();
        void createPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
    }
}