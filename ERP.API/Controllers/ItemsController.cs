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
    public class ItemsController : Controller
    {
        private readonly IDataRepository repository;
        private readonly IMapper mapper;

        public ItemsController(IDataRepository repository, IMapper mapper)
        {
            this.mapper = mapper;
            this.repository = repository;
        }
      
        [HttpGet]
        public async Task<IActionResult> GetItems()
        {
            var items = await this.repository.GetItems();
            var itemsToReturn = mapper.Map<IEnumerable<ItemListDto>>(items);
            return Ok(itemsToReturn);
        }

        [HttpGet("active")]
        public async Task<IActionResult> GetActiveItems()
        {
            var items = await this.repository.GetActiveItems();
            var itemsToReturn = mapper.Map<IEnumerable<ItemListDto>>(items);
            return Ok(itemsToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetItem(int id)
        {
            var item = await this.repository.GetItem(id);
            return Ok(item);
       }

        [HttpPost]
        public async Task<IActionResult> CreateItem([FromBody] Item item)
        {
            var itemCreated = await this.repository.Add(item);
            if(itemCreated == null)
                    return BadRequest("Error - Item NOT created");
                return Ok(item);
        }

        [HttpPut]
        public async Task<IActionResult> Updateitem([FromBody] Item itemToUpdate)
        {
            var updatedItem = await this.repository.UpdateEntity(itemToUpdate);
            if(updatedItem == null)
                return NotFound("Error change happened");
            
            return Ok(updatedItem);
        }
    }
}