using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ERP.API.Data;
using ERP.API.DTOs;
using ERP.API.DTOs.SupplierDtos;
using ERP.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ERP.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class SuppliersController : Controller
    {
        private readonly IDataRepository repo;
        private readonly IMapper mapper;
        public SuppliersController(IDataRepository repo, IMapper mapper)
        {
            this.mapper = mapper;
            this.repo = repo;

        }
        [HttpGet]
        public async Task<IActionResult> GetSuppliers()
        {
            //var suppliers = await this.context.Suppliers.ToListAsync();
            var suppliers = await this.repo.GetSuppliers();
            var suppliersToReturn = mapper.Map<IEnumerable<SupplierListDto>>(suppliers);
           // return Ok(suppliers);
            return Ok(suppliersToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSupplier(int id)
        {
            var supplier = await this.repo.GetSupplier(id);
            return Ok(supplier);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSupplier([FromBody] Supplier supplier)
        {
            
            var updatedSupplier = await this.repo.UpdateSupplier(supplier);
            if(updatedSupplier == null)
                return BadRequest("Error change happened");
            return Ok(updatedSupplier);
        }

        [HttpPost]
        public async Task<IActionResult> CreateSupplier([FromBody] Supplier supplier)
        {
            var successful =await this.repo.Add(supplier);
            if(!successful)
                return BadRequest("Error - Supplier not created");
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupplier(int id)
        {
            var supplierToDelete =  await this.repo.GetSupplier(id);
            if(supplierToDelete != null) {
                this.repo.Delete(supplierToDelete); 
                return Ok();
            }            
            return BadRequest("Supplier does NOT exist!");
        }
    }
}