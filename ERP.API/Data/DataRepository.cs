using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using ERP.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ERP.API.Data
{
    public class DataRepository : IDataRepository
    {
        private  DataContext context;
        public DataRepository(DataContext context)
        {
            this.context = context;
        }
        public async Task<T> Add<T>(T entity) where T : class
        {
            var createdEntity = await this.context.AddAsync(entity);
            await this.context.SaveChangesAsync();
            return createdEntity.Entity;
        }

        public async Task<bool> Delete<T>(T entity) where T : class
        {
            this.context.Remove(entity);
            return await this.context.SaveChangesAsync() >= 1 ? true : false;
        }

        public async Task<T> UpdateEntity<T>(T entity) where T : class
        {
            this.context.Update(entity);
            bool succeeded = await this.SaveChangesAsync();
            
            return succeeded == true ? entity : null;
        }
        public async Task<IEnumerable<Supplier>> GetSuppliers() 
        {
            return await this.context.Suppliers.ToListAsync();
        }

        private async Task<bool> SaveChangesAsync()
        {
            try 
            {                                
                await this.context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException ex)  
            {  
                var inEntry = ex.Entries.Single();  
                var dbEntry = inEntry.GetDatabaseValues();  
        
            
                var inModel = inEntry.Entity as Supplier;  
                var dbModel = dbEntry.ToObject() as Supplier;  
            
                var conflicts = new Dictionary<string, string>();  
            
                return false;
            }  
        }
        public async Task<Supplier> GetSupplier(int supplierId)
        {
            return await this.context.Suppliers.FirstOrDefaultAsync(sup => sup.SupplierId == supplierId);
        }

        public async Task<IEnumerable<Item>> GetItems()
        {
            return await this.context.Items.ToListAsync();
        }
        public async Task<Item> GetItem(int id)
        {
           return await this.context.Items.FirstOrDefaultAsync(item => item.ItemId == id);
        }

        public async Task<IEnumerable<ItemSupplier>> GetItemSuppliers(int itemId) 
        {
            return await this.context.ItemSuppliers
            .Where(item => item.ItemId == itemId)
            .Include(item => item.Supplier).OrderByDescending(itemSupplier => itemSupplier.IsPrimary).ToListAsync();
        //    IEnumerable<ItemSupplier> supps =  (IEnumerable<ItemSupplier>)this.context.ItemSuppliers.Where(item => item.ItemId == itemId).Join(
        //     context.Suppliers,
        //     item => item.ItemId,
        //     supplier => supplier.SupplierId,
        //     (item, supplier) => new {
        //         unitCost = item.UnitCost,
        //         supplierName = supplier.Name,
        //         key = supplier.SupplierId
        //     }).ToListAsync();

        //     return supps;
        }

        public async Task<ItemSupplier> GetItemSupplier(int itemId, int supplierId) 
        {
            var itemSupplier = await this.context.ItemSuppliers.FirstOrDefaultAsync(itemSupp => itemSupp.ItemId == itemId && itemSupp.SupplierId == supplierId);
            return itemSupplier == null ? null : itemSupplier;
        }

        public async Task<IEnumerable<ItemSupplier>> GetItemsOfSupplier(int supplierId) 
        {
            return await this.context.ItemSuppliers.Where(itemSuppliers => itemSuppliers.SupplierId == supplierId).Include(itemSupp => itemSupp.Item).ToListAsync();

        }

        public async Task<IEnumerable<Order>> GetOrders() 
        {
            return await this.context.Orders.Include(order => order.Supplier).ToListAsync();
        }
        public async Task<Order> GetOrder(int id)
        {
           return await this.context.Orders.FirstOrDefaultAsync(order => order.OrderId == id);
        }

        public async Task<bool> CreateOrder(Order orderToCreate)
        {
            await this.context.Orders.AddAsync(orderToCreate);
            return await this.context.SaveChangesAsync() >= 1 ? true : false;
        }
        public async Task<bool> AddOrderItem(IEnumerable<OrderItem> orderItems)
        {
            await this.context.OrderItems.AddRangeAsync(orderItems);
            return await this.context.SaveChangesAsync() >= 1 ? true : false;
        }
        public async Task<IEnumerable<OrderItem>> GetOrderItems(int orderId) 
        {
            return await this.context.OrderItems.Where(order => order.OrderId == orderId).Include(order => order.Item).ToListAsync();
        }

        public async Task<bool> UpdateOrderItems(IEnumerable<OrderItem> orderItemsToUpdate, int orderId)
        {
            if(orderItemsToUpdate.ToArray().Length == 0) 
            {
                return false;
            }

            var itemsToDelete = await this.GetOrderItems(orderId);
            foreach (var item in itemsToDelete)
            {
                await this.Delete(item);
            }

            return await this.AddOrderItem(orderItemsToUpdate);
        }

        public async Task<OrderItem> GetSingleOrderItems(int orderId, int itemId) 
        {
            return await this.context.OrderItems.Where(order => order.OrderId == orderId && order.ItemId == itemId).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Employee>> GetEmployees()
        {
            return await this.context.Employees.Include(employee => employee.Position).ToListAsync();
        }

        public async Task<Employee> GetEmployee(string employeeEmail)
        {
            return await this.context.Employees.FirstOrDefaultAsync(employee => employee.Email.Equals(employeeEmail));
        }

        public Task<Item> UpdateItem(Item item)
        {
            throw new NotImplementedException();
        }

        public Task<Order> UpdateOrder(Order order)
        {
            throw new NotImplementedException();
        }
    }
}