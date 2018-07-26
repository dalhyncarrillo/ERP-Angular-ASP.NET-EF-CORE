using System.Threading.Tasks;
using AutoMapper;
using ERP.API.Data;
using ERP.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ERP.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class OrderItemsController : Controller
    {
        private IDataRepository repository;
        private IMapper mapper;
        public OrderItemsController(IDataRepository repository, IMapper mapper)
        {
            this.mapper = mapper;
            this.repository = repository;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderItems(int id) 
        {
            var orderItems = await this.repository.GetOrderItems(id);
            return Ok(orderItems);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrderItems([FromBody] OrderItem orderItemToCreate) 
        {
            bool succeeded = false;
            if(orderItemToCreate != null)
            {
                succeeded = await this.repository.Add(orderItemToCreate);
            }
            if(succeeded)
                return Ok();
            else
                return BadRequest();

        }
    }
}