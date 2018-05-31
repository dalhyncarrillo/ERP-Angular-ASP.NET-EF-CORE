using System;
using System.Threading.Tasks;
using ERP.API.Data;
using ERP.API.DTOs;
using ERP.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace ERP.API.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IAuthRepository repo;
        public AuthController(IAuthRepository repo)
        {
            this.repo = repo;
        }

        [HttpGet("positions")]
        public async Task<IActionResult> GetPositions()
        {
            var positions =  await this.repo.GetPositions();
            return Ok(positions);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] EmployeeRegisterDto dto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
                
            var doesExist = await this.repo.EmployeeExists(dto.Email);
            if(doesExist)
                return BadRequest("Email is already taken!");
            
            dto.FirstName = dto.FirstName.ToLower();
            dto.LastName = dto.LastName.ToLower();

            var employeeToBeCreated = new Employee() 
            {
                Email = dto.Email,
                FirstName = dto.FirstName, 
                LastName = dto.LastName,
                DateOfBirth = dto.DateOfBirth,
                PositionId = dto.PositionId,
                Created = DateTime.Now,
                Salary = 0.0,
                LastUpdated = DateTime.Now               
            };

            var createdEmployee = await this.repo.Register(employeeToBeCreated, dto.Password);
            return StatusCode(201);
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] EmployeeLoginDto employeeLoginDto)
        {
            var employee = await this.repo.Login(employeeLoginDto.Email, employeeLoginDto.Password);
            if(employee == null)
                return Unauthorized();

            return Ok(employee);
        }
        
    }
}