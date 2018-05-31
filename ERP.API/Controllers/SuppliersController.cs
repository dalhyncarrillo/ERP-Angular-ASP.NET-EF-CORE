using System.Linq;
using System.Threading.Tasks;
using ERP.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ERP.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class SuppliersController : Controller
    {
        private readonly IDataRepository repo;
        private readonly DataContext context;
        public SuppliersController(IDataRepository repo, DataContext context)
        {
            this.context = context;
            this.repo = repo;

        }
        [HttpGet]
        public async Task<IActionResult> GetSuppliers()
        {
            //var suppliers = await this.context.Suppliers.ToListAsync();
          var suppliers =  await this.repo.GetSuppliers();    
            return Ok(suppliers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSupplier(int id)
        {
            var supplier =  await this.repo.GetSupplier(id);
            return Ok(supplier);
        }
    }
}