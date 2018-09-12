using System.Collections.Generic;
using System.Threading.Tasks;
using ERP.API.DTOs.OrderDtos;
using ERP.API.Models;

namespace ERP.API.Data
{
    public interface IDataRepository
    {
        Task<T> UpdateEntity<T>(T entity) where T: class;
        Task<T> Add<T>(T entity) where T: class;
        Task<bool> Delete<T>(T entity) where T: class;
        Task<IEnumerable<Supplier>> GetSuppliers();
        Task<IEnumerable<Supplier>> GetActiveSuppliers();
        Task<Supplier> GetSupplier(int id);
        Task<IEnumerable<Item>> GetItems();
        Task<IEnumerable<Item>> GetActiveItems();
        Task<Item> GetItem(int id);
        Task<IEnumerable<ItemSupplier>> GetItemSuppliers(int itemId);
        Task<ItemSupplier> GetItemSupplier(int itemId, int supplierId);
        Task<IEnumerable<ItemSupplier>> GetItemsOfSupplier(int supplierId); 
        Task<Item> UpdateItem(Item item);
        Task<IEnumerable<Order>> GetOrders();
        Task<Order> GetOrder(int id);
        Task<IEnumerable<OrderItem>> GetOrderItems(int orderId);
        Task<bool> SaveChangesAsync();
        Task<bool> UpdateOrderItems(IEnumerable<OrderItem> orderItemsToUpdate, int orderId);
        Task<OrderItem> GetSingleOrderItems(int orderId, int itemId);
        Task<bool> AddOrderItem(IEnumerable<OrderItem> orderItems);
        Task<Order> UpdateOrder(Order order);
        Task<IEnumerable<Employee>> GetEmployees();
        Task<Employee> GetEmployee(int employeeId);
    }
}