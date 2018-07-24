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
            var itemSuppliers = await this.repository.GetItemSuppliers(itemId);
            var itemSuppliersToReturn = mapper.Map<IEnumerable<ItemSupplierDto>>(itemSuppliers);
            return Ok(itemSuppliersToReturn);
        }
        //NEM TALALOM HOL VAN EZ AZ API HASZNALATBAN
        /* 
        [HttpGet("{itemId}/{supplierId}")]
        public async Task<IActionResult> GetItemSupplier(int itemId, int supplierId) 
        {   
            var itemSupplier = await this.repository.GetItemSupplier(itemId, supplierId);
            var itemSupplierToReturn = mapper.Map<ItemSupplierDto>(itemSupplier);
            if (itemSupplier == null) {
                return BadRequest("This supplier does NOT belong to this item!");
                
            }
            return Ok(itemSupplierToReturn);
        }
        */
        [HttpGet("supplierId/{supplierId}")]
        public async Task<IActionResult> GetItemsOfSupplier(int supplierId)
        {
            var itemsOfSupplier = await this.repository.GetItemsOfSupplier(supplierId);
            var itemSuppliersToReturn = mapper.Map<IEnumerable<ItemSupplierDto>>(itemsOfSupplier);
            return Ok(itemSuppliersToReturn);
        }


        [HttpPost]
        public async Task<IActionResult> CreateItemSuppliers([FromBody] ItemSupplier itemSupplier)
        {
            var item =  await this.repository.GetItemSupplier(itemSupplier.ItemId, itemSupplier.SupplierId);
            if(item != null)
                return BadRequest("Error - This supplier already belongs to this item!");
             var successful = await this.repository.Add(itemSupplier);
            if(!successful)
                return BadRequest("Error - Item Supplier NOT created");
            return Ok(itemSupplier);
        }
    }
}