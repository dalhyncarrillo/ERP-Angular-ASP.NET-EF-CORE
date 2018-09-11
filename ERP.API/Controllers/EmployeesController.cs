using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ERP.API.Data;
using ERP.API.DTOs;
using ERP.API.DTOs.EmployeeDtos;
using ERP.API.DTOs.SupplierDtos;
using ERP.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ERP.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class EmployeesController : Controller
    {
        private readonly IDataRepository repo;
        private readonly IMapper mapper;
        public EmployeesController(IDataRepository repo, IMapper mapper)
        {
            this.mapper = mapper;
            this.repo = repo;

        }
        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            var employees = await this.repo.GetEmployees();
            var employeesToReturn = mapper.Map<IEnumerable<EmployeeListDto>>(employees);
            return Ok(employeesToReturn);
        }

        [HttpGet("{employeeId}")]
        public async Task<IActionResult> GetEmployee(int employeeId)
        {
            var employee = await this.repo.GetEmployee(employeeId);
            if(employee == null)
                return NotFound("The employee is not found");
            var employeeToReturn = this.mapper.Map<EmployeeDetailedDto>(employee);
            
            return Ok(employeeToReturn);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateEmployee([FromBody] Employee employeeToUpdate)
        {
            var employee = await this.repo.GetEmployee(employeeToUpdate.EmployeeId);

            employeeToUpdate.PasswordHash = employee.PasswordHash;
            employeeToUpdate.PasswordSalt = employee.PasswordSalt;

            var updatedEmployee = await this.repo.UpdateEntity(employeeToUpdate);
            if(updatedEmployee == null)
                return BadRequest("The record you are trying to update has been modified!");
            return Ok(updatedEmployee);
        }
    }
}