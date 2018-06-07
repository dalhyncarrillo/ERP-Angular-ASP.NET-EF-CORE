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
            var supplierToUpdate = await this.context.Suppliers.FirstOrDefaultAsync(x => x.SupplierId == supplier.SupplierId);
            if(supplierToUpdate == null)
                return null;
            supplierToUpdate.Name = supplier.Name;
           // this.context.Suppliers.Update(supplierToUpdate);
            await this.context.SaveChangesAsync();
            return supplierToUpdate;
        }
    }
}