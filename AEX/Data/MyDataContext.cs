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
            //Films = new List<Film>();
            Database.EnsureCreated();


            //var actor = new Actor() { Name = "Сильвестр", Surname = "Сталлоне", Age = 77 };
            //Actors.Add(actor);
            //var genre1 = Genres.FirstOrDefault(x => x.Id == 15 );
            //var genre2 = Genres.FirstOrDefault(x => x.Id == 17);

            //var film = new Film()
            //{
            //    Title = "Рокки",
            //    Description = "Это описание фильма Рокки"
            //};
            //film.actors.Add(actor);
            //film.genres.Add(genre1);
            //film.genres.Add(genre2);
            //Films.Add(film);
            //SaveChanges();
        }
    }
}
