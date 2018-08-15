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
        private readonly DataContext context;
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

        public async Task<bool> AddOrderItem(IEnumerable<OrderItem> orderItems)
        {
            await this.context.AddRangeAsync(orderItems);
            return await this.context.SaveChangesAsync() >= 1 ? true : false;
        }

        public async Task<bool> Delete<T>(T entity) where T : class
        {
            this.context.Remove(entity);
            return await this.context.SaveChangesAsync() >= 1 ? true : false;
        }

        public Task<T> UpdateEntity<T>(T entity) where T : class
        {
            throw new System.NotImplementedException();
        }

         public async Task<Supplier> GetSupplier(int supplierId)
        {
            var supplier = await this.context.Suppliers.FirstOrDefaultAsync(sup => sup.SupplierId == supplierId);
            if(supplier == null)
                return null;

            return supplier;
        }

        public async Task<IEnumerable<Supplier>> GetSuppliers() 
        {
            return await this.context.Suppliers.ToListAsync();
        }

        public async Task<Supplier> UpdateSupplier(Supplier supplier)
        {
            var supplierToUpdate = await GetSupplier(supplier.SupplierId);
            if(supplierToUpdate == null)
                return null;

            supplierToUpdate.Name = supplier.Name;
            supplierToUpdate.Address = supplier.Address;
            supplierToUpdate.City = supplier.City;
            supplierToUpdate.ContactName = supplier.ContactName;
            supplierToUpdate.PhoneNumber = supplier.PhoneNumber;
            supplierToUpdate.Status = supplier.Status;
              
            await this.context.SaveChangesAsync();
            return supplierToUpdate;
        }

        public async Task<IEnumerable<Item>> GetItems()
        {
            return await this.context.Items.ToListAsync();
        }
        public async Task<Item> GetItem(int id)
        {
           return await this.context.Items.FirstOrDefaultAsync(item => item.ItemId == id);
        }
        
        public Task<Item> UpdateItem(Item item)
        {
            throw new System.NotImplementedException();
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

        public async Task<Order> UpdateOrder(Order order)
        {
            var orderToUpdate = await this.GetOrder(order.OrderId);
            if(orderToUpdate == null)
                return null;
            //     Debug.WriteLine("------------------------------------------------------");
            // Debug.WriteLine("hello");
            // Debug.WriteLine(order.ApprovedBy);

            orderToUpdate.Status = order.Status;
            orderToUpdate.TotalCost = order.TotalCost;
            orderToUpdate.ApprovedBy = order.ApprovedBy;
            orderToUpdate.ReceivedDate = order.ReceivedDate;

            await this.context.SaveChangesAsync();
            return orderToUpdate;
        }
        public async Task<IEnumerable<OrderItem>> GetOrderItems(int orderId) 
        {
            return await this.context.OrderItems.Where(order => order.OrderId == orderId).Include(order => order.Item).ToListAsync();
        }

        public async Task<OrderItem> GetSingleOrderItems(int orderId, int itemId) 
        {
            return await this.context.OrderItems.Where(order => order.OrderId == orderId && order.ItemId == itemId).FirstOrDefaultAsync();
        }


    }
}