using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using ERP.API.Data;
using ERP.API.DTOs.ItemDtos;
using ERP.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ERP.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]

    public class ItemSuppliersController : Controller
    {
        private readonly IDataRepository repository;
        private readonly IMapper mapper;

        public ItemSuppliersController(IDataRepository repository, IMapper mapper)
        {
            this.mapper = mapper;
            this.repository = repository;
        }
        [HttpGet("{itemId}")]
        public async Task<IActionResult> GetItemSuppliers(int itemId) 
        {   
            var itemSuppliers = await this.repository.GetItemSupplier(itemId);
            var itemSuppliersToReturn = mapper.Map<IEnumerable<ItemSupplierDto>>(itemSuppliers);
            return Ok(itemSuppliersToReturn);
        }

        [HttpPost]
        public async Task<IActionResult> CreateItemSuppliers([FromBody] ItemSupplier itemSupplier)
        {
           var successful = await this.repository.Add(itemSupplier);
           if(!successful)
                return BadRequest("Error - Item Supplier NOT created");
            return Ok(itemSupplier);
        }
    }
}