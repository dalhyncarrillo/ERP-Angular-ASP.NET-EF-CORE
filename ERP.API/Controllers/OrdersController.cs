using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using ERP.API.Data;
using ERP.API.DTOs.ItemDtos;
using ERP.API.DTOs.OrderDtos;
using ERP.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System;

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
            var orderToReturn = this.mapper.Map<OrderDetailDto>(order);
            return Ok(orderToReturn);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id) 
        {
            var orderToDelete =  await this.repository.GetOrder(id);
            if(orderToDelete != null) {
                await this.repository.Delete(orderToDelete); 
                return Ok();
            }            
            return BadRequest();
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
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder([FromBody] Order orderToUpdate)
        {
            var updatedOrder = await this.repository.UpdateEntity(orderToUpdate);
            if(updatedOrder == null)
                return BadRequest("Error change happened");
            return Ok(updatedOrder);
        }

        [HttpPut("approve")]
        public async Task<IActionResult> ApproveOrder([FromBody] Order orderToUpdate)
        {
            orderToUpdate.Status = "Approved";
            var updatedOrder = await this.repository.UpdateEntity(orderToUpdate);
            if(updatedOrder == null)
                return BadRequest("Error change happened");
                
            await this.updateItemQuantityOrdered(orderToUpdate.OrderId);
            
            var updatedOrderToReturn = this.mapper.Map<OrderDetailDto>(updatedOrder);
            return Ok(updatedOrderToReturn);
        }

        private async Task updateItemQuantityOrdered(int orderId)
        {
            var orderItems = await this.repository.GetOrderItems(orderId);
            var items =  await this.repository.GetItems();
            foreach (var orderItem in orderItems)
            {
                foreach (var item in items)
                {
                    if(item.ItemId == orderItem.ItemId)
                    {
                        item.QuantityOrdered += orderItem.Quantity;
                        await this.repository.UpdateEntity(item);
                    }
                }
            }
        }

        [HttpPut("receive")]
        public async Task<IActionResult> ReceiveOrder([FromBody] Order orderToUpdate)
        {
            orderToUpdate.Status = "Received";
            var updatedOrder = await this.repository.UpdateEntity(orderToUpdate);
            if(updatedOrder == null)
                return BadRequest("Error change happened");

            await this.updateItemQuantitiesOnHand(orderToUpdate.OrderId);   

            var updatedOrderToReturn = this.mapper.Map<OrderDetailDto>(updatedOrder);
            return Ok(updatedOrderToReturn);
        }

        private async Task updateItemQuantitiesOnHand(int orderId)
        {
            var orderItems = await this.repository.GetOrderItems(orderId);
            var items =  await this.repository.GetItems();
            foreach (var orderItem in orderItems)
            {
                foreach (var item in items)
                {
                    if(item.ItemId == orderItem.ItemId)
                    {
                        //http://www.szamvitelnavigator.hu/2012/10/csusztatott-sulyozott-gordulo-atlagar.html
                        item.AvgCost = (item.QuantityOnHand * item.AvgCost + orderItem.Quantity * orderItem.UnitCost) / (item.QuantityOnHand + orderItem.Quantity);
                        item.QuantityOrdered -= orderItem.Quantity;
                        item.QuantityOnHand += orderItem.Quantity;
                        await this.repository.UpdateEntity(item);
                    }
                }
            }
        }
    }
}