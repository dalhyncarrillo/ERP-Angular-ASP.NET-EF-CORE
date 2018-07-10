using System.Collections.Generic;
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

        public async Task<bool> Add<T>(T entity) where T : class
        {
           await this.context.AddAsync(entity);
           return await this.context.SaveChangesAsync() >= 1 ? true : false;
        }

        public async void Delete<T>(T entity) where T : class
        {
            this.context.Remove(entity);
            await this.context.SaveChangesAsync();
        }

        public Task<T> UpdateEntity<T>(T entity) where T : class
        {
            throw new System.NotImplementedException();
        }

         public async Task<Supplier> GetSupplier(int supplierId)
        {
            return await this.context.Suppliers.FirstOrDefaultAsync(sup => sup.SupplierId == supplierId);
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

        public async Task<IEnumerable<ItemSupplier>> GetItemSupplier(int itemId) {
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

        public Task<Item> UpdateItem(Item item)
        {
            throw new System.NotImplementedException();
        }
    }
}