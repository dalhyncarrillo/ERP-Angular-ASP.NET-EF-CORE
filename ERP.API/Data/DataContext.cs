using ERP.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ERP.API.Data
{
    public class DataContext : DbContext
    {
         public DataContext(DbContextOptions<DataContext> options) : base(options)
        { }

        public DbSet<Item> Items { get; set; }
        public DbSet<Inventory> Inventories { get; set; }
        public DbSet<ItemSupplier> ItemSuppliers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }    
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<CreditAccount> CreditAccounts { get; set; }
        public DbSet<DebitAccount> DebitAccounts { get; set; }
        public DbSet<GeneralLedger> GeneralLedgers { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
             modelBuilder.Entity<Inventory>()
                .HasKey(c => new { c.InventoryId});

            modelBuilder.Entity<Inventory>()
                .HasKey(c => new { c.InventoryId});                

            modelBuilder.Entity<ItemSupplier>()
                .HasKey(c => new { c.ItemId, c.SupplierId });
            
            modelBuilder.Entity<OrderItem>()
                .HasKey(c => new { c.OrderId, c.ItemId });
        }  
    }
}