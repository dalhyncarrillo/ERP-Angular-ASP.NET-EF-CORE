using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ERP.API.Data
{
    public class BaseRepository
    {
        protected  DataContext context;
        public BaseRepository(DataContext context)
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
        public async Task<bool> SaveChangesAsync()
        {
            try 
            {                                
                await this.context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException)  
            {  
                return false;
            }  
        }
    }
}