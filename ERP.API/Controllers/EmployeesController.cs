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
    //[Authorize]
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

        [HttpGet("{employeeEmail}")]
        public async Task<IActionResult> GetEmployee(string employeeEmail)
        {
            var employee = await this.repo.GetEmployee(employeeEmail);
            if(employee == null)
                return NotFound("The employee is not found");
            var employeeToReturn = this.mapper.Map<EmployeeDetailedDto>(employee);
            
            return Ok(employeeToReturn);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateEmployee([FromBody] Employee employeeToUpdate)
        {
            try 
            {
                var updatedEmployee = await this.repo.UpdateEmployee(employeeToUpdate);
                if(updatedEmployee == null)
                    return NotFound("The employee is NOT found");
                
                return Ok(updatedEmployee);
            }
            catch (DbUpdateConcurrencyException ex)  
            {  
                var inEntry = ex.Entries.Single();  
                var dbEntry = inEntry.GetDatabaseValues();  
            
                if (dbEntry == null)  
                    return StatusCode(StatusCodes.Status500InternalServerError,   
                        "Actor was deleted by another user");  
            
                var inModel = inEntry.Entity as Employee;  
                var dbModel = dbEntry.ToObject() as Employee;  
            
                var conflicts = new Dictionary<string, string>();  
            
                return StatusCode(StatusCodes.Status412PreconditionFailed, conflicts);  
            }  
        }
    }
}