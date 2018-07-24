using System.Threading.Tasks;
using AutoMapper;
using ERP.API.Data;
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
    }
}