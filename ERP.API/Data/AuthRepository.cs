using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
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

        public async Task<IEnumerable<Position>> GetPositions()
        {
            return await this.context.Positions.ToListAsync();
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
            
            return verifyPassword(password, employee) ? employee : null;
        }

        private bool verifyPassword(string password, Employee employee)
        {
            using(var hmac = new HMACSHA512(employee.PasswordSalt))
            {
                var hashedInputPassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < employee.PasswordHash.Length; i++)
                {
                    if(hashedInputPassword[i] != employee.PasswordHash[i])
                        return false;
                }
            }
            return true;
        }

        public async Task<Employee> Register(Employee employee, string password)
        {
            byte[] passwordHash, passwordSalt;
            
            createPasswordHash(password, out passwordHash, out passwordSalt);
            
            employee.PasswordHash = passwordHash;
            employee.PasswordSalt = passwordSalt;
            
            await this.context.Employees.AddAsync(employee);
            await context.SaveChangesAsync();
            return employee;
        }

        private void createPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }
    }
}