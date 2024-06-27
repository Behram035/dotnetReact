using CrudApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CrudApi.Data
{
    public class StudentContext : DbContext
    {
       

        public StudentContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Students> Students { get; set; }
    }
}
