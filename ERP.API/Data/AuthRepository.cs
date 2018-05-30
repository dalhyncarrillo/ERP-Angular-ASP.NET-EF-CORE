using System.Threading.Tasks;
using ERP.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ERP.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext context;
        public AuthRepository(DataContext context)
        {
            this.context = context;

        }
        public async Task<bool> EmployeeExists(string email)
        {
            return await this.context.Employees.AnyAsync(emp => emp.Email == email);
        }
        public async Task<Employee> Login(string email, string password)
        {
            var employee = await this.context.Employees.FirstOrDefaultAsync(emp => emp.Email == email);
            if(employee == null) 
            {
                return null;
            }

            return employee;
        }

        public async Task<Employee> Register(Employee employee, string password)
        {
            await this.context.Employees.AddAsync(employee);
            await context.SaveChangesAsync();
            return employee;
        }
    }
}