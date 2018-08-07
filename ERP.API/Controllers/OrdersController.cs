using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using ERP.API.Data;
using ERP.API.DTOs.ItemDtos;
using ERP.API.DTOs.OrderDtos;
using ERP.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ERP.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class OrdersController : Controller
    {
        private IDataRepository repository;
        private IMapper mapper;
        public OrdersController(IDataRepository repository, IMapper mapper)
        {
            this.mapper = mapper;
            this.repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetOrders() 
        {
            var orders = await this.repository.GetOrders();
            var ordersToReturn = this.mapper.Map<IEnumerable<OrderListDto>>(orders);
            return Ok(ordersToReturn);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(int id) 
        {
            var order = await this.repository.GetOrder(id);
            return Ok(order);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] Order orderToCreate) 
        {
            if(orderToCreate != null)
            {
               var entity = await this.repository.Add(orderToCreate);
                return Ok(entity);
            }          
            return BadRequest();
        }
    }
}