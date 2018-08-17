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
        Task<Supplier> GetSupplier(int id);
        Task<Supplier> UpdateSupplier(Supplier supplier);
        Task<IEnumerable<Item>> GetItems();
        Task<Item> GetItem(int id);
        Task<IEnumerable<ItemSupplier>> GetItemSuppliers(int itemId);
        Task<ItemSupplier> GetItemSupplier(int itemId, int supplierId);
        Task<IEnumerable<ItemSupplier>> GetItemsOfSupplier(int supplierId); 
        Task<Item> UpdateItem(Item item);
        Task<IEnumerable<Order>> GetOrders();
        Task<Order> GetOrder(int id);
        Task<IEnumerable<OrderItem>> GetOrderItems(int orderId);
        Task<OrderItem> GetSingleOrderItems(int orderId, int itemId);
        Task<bool> AddOrderItem(IEnumerable<OrderItem> orderItems);
        Task<Order> UpdateOrder(Order order);
<<<<<<< HEAD

        Task<IEnumerable<Employee>> GetEmployees();
        Task<Employee> GetEmployee(string employeeEmail);
        Task<Employee> UpdateEmployee(Employee employeeToUpdate);
=======
>>>>>>> fbbcba95f7e0961ae37c9072f544b05f5b099790
    }
}