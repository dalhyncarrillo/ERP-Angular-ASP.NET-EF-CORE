using System.Collections.Generic;
using System.Threading.Tasks;
using ERP.API.Models;

namespace ERP.API.Data
{
    public interface IDataRepository
    {
        Task<IEnumerable<Supplier>> GetSuppliers();
        Task<Supplier> GetSupplier(int id);
        Task<Supplier> UpdateSupplier(Supplier supplier);
    }
}