using AEX.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace AEX.Data
{
    public class MyDataContext: DbContext
    {
        //public List<Film> Films { get; set; }
        public DbSet<Film> Films { get; set; } = null!;
        public DbSet<Actor> Actors { get; set; } = null!;
        public DbSet<Genre> Genres { get; set; } = null!;


        public MyDataContext(DbContextOptions<MyDataContext> options)
            :base(options)
        {
            Database.EnsureCreated();
        }
    }
}
