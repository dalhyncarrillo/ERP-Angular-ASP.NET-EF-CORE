using System.Collections.Generic;
using System.Threading.Tasks;
using ERP.API.Models;

namespace ERP.API.Data
{
    public interface IDataRepository
    {
        Task<T> UpdateEntity<T>(T entity) where T: class;
        Task<bool> Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<IEnumerable<Supplier>> GetSuppliers();
        Task<Supplier> GetSupplier(int id);
        Task<Supplier> UpdateSupplier(Supplier supplier);
        Task<IEnumerable<Item>> GetItems();
        Task<Item> GetItem(int id);
        Task<IEnumerable<ItemSupplier>> GetItemSupplier(int supplierId);
        Task<Item> UpdateItem(Item item);
    }
}