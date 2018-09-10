using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ERP.API.Data;
using ERP.API.DTOs;
using ERP.API.DTOs.EmployeeDtos;
using ERP.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace ERP.API.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IAuthRepository repo;
        private readonly IMapper mapper;

        public AuthController(IAuthRepository repo, IMapper mapper)
        {
            this.mapper = mapper;
            this.repo = repo;
        }

        [HttpGet("positions")]
        public async Task<IActionResult> GetPositions()
        {
            var positions = await this.repo.GetPositions();
            return Ok(positions);
        }

        [HttpGet("roles/{id}")]
        public async Task<IActionResult> GetEmployeeRoles(int id)
        {
            var employeeRoles = await this.repo.GetEmployeeRoles(id);
            var employeeRolesToReturn = this.mapper.Map<IEnumerable<EmployeeRoleDto>>(employeeRoles);
            return Ok(employeeRolesToReturn);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] EmployeeRegisterDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var doesExist = await this.repo.EmployeeExists(dto.Email);
            if (doesExist)
                return BadRequest("Email is already taken!");

            var employeeToBeCreated = new Employee()
            {
                Email = dto.Email,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                DateOfBirth = dto.DateOfBirth,
                PositionId = dto.PositionId,
                Created = DateTime.Now,
                Salary = dto.Salary,
                LastUpdated = DateTime.Now
            };

            var createdEmployee = await this.repo.Register(employeeToBeCreated, dto.Password);
            return StatusCode(201);
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] EmployeeLoginDto employeeLoginDto)
        {
            var employee = await this.repo.Login(employeeLoginDto.Email, employeeLoginDto.Password);
            if (employee == null)
                return Unauthorized();
            var employeeRoles = await this.repo.GetEmployeeRoles(employee.EmployeeId);
            var employeeCurrentRoles = this.mapper.Map<IEnumerable<EmployeeRoleDto>>(employeeRoles);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("super secret key");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                            new Claim(ClaimTypes.Name, employee.Email),
                            new Claim(ClaimTypes.Role, employee.PositionId.ToString()),
                     new Claim(ClaimTypes.NameIdentifier, employee.EmployeeId.ToString())

                }),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha512Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            return Ok(new { tokenString, employeeCurrentRoles });
        }

        [HttpDelete("{employeeId}/{roleId}")]
        public async Task<IActionResult> DeleteEmployeeRole(int employeeId, int roleId)
        {   
            var employeeRole = await this.repo.GetSingleEmployeeRole(employeeId, roleId);
         if(employeeRole != null)
            {
                await this.repo.Delete(employeeRole);
                return Ok();
            }
                
            return BadRequest("An Error occured during execution.");
        }
      
        [HttpGet("availableroles/{employeeId}")]
        public async Task<IActionResult> GetRolesThatEmployeeNotHave(int employeeId)
        {
            var roles = await this.repo.GetRolesThatEmployeeNotHave(employeeId);
            return Ok(roles);
        }
        [HttpPost("employeerole")]
        public async Task<IActionResult> CreateEmployeeRole([FromBody]EmployeeRole employeeRole)
        {
            var createdEmployeeRole = await this.repo.Add(employeeRole);
            if(createdEmployeeRole == null)
                return BadRequest("An Error orccured during execution");

            return Ok(createdEmployeeRole);
        }

    }
}