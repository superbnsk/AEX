using AEX.Data;
using AEX.Models.Entities;
using AEX.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AEX.Services
{
    public class FilmsService : IFilmsService
    {
        private MyDataContext _dataContext;
        public FilmsService(MyDataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public Film Create(Film film)
        {
            var newFilm = new Film()
            {
                Title = film.Title,
                Description = film.Description
            };
            foreach(var a in film.actors)
            {
                var actor = _dataContext.Actors.FirstOrDefault(x => x.Id == a.Id);
                if (actor != null)
                {
                    newFilm.actors.Add(actor);
                }
            }
            foreach (var g in film.genres)
            {
                var genre = _dataContext.Genres.FirstOrDefault(x => x.Id == g.Id);
                if (genre != null)
                {
                    newFilm.genres.Add(genre);
                }
            }
            _dataContext.Films.Add(newFilm);
            _dataContext.SaveChanges();
            return film;
        }

        public Film Update(Film film)
        {
            var filmToUpdate = _dataContext.Films.FirstOrDefault(x => x.Id == film.Id);
            if (filmToUpdate != null)
            {
                filmToUpdate.Title = film.Title;
                filmToUpdate.Description = film.Description;
                _dataContext.SaveChanges();
            }
            return filmToUpdate;
        }

        public void Delete(int id)
        { 
            var filmToDelete = _dataContext.Films.FirstOrDefault(x => x.Id == id);
            if (filmToDelete != null)
            {
                _dataContext.Films.Remove(filmToDelete);
                _dataContext.SaveChanges();
            }
        }

        public Film Get(int id)
        {
            return _dataContext.Films.FirstOrDefault(x => x.Id == id);
        }

        public List<Film> Get()
        {
            return _dataContext.Films
                .Include(x => x.actors)
                .Include(x => x.genres)
                .ToList();
        }

        public List<Genre> GetGenres()
        {
            return _dataContext.Genres.ToList();
        }

        public List<Actor> GetActors()
        {
            return _dataContext.Actors.ToList();
        }

        public List<Film> Search(string query)
        {
            return _dataContext.Films.
                Where(x => x.Title.ToLower().Contains(query.ToLower()) 
                || x.Description.ToLower().Contains(query.ToLower())
                || x.actors.Where(y => y.Name.ToLower().Contains(query.ToLower()) || y.Surname.ToLower().Contains(query.ToLower())).ToList().Count > 0
                || x.genres.Where(z => z.Name.ToLower().Contains(query.ToLower())).ToList().Count > 0
                )
                .Include(x => x.actors)
                .Include(x => x.genres)
                .ToList();
        }
    }
}
