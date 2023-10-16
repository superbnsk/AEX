using AEX.Models.Entities;

namespace AEX.Services.Interfaces
{
    public interface IFilmsService
    {
        Film Create(Film film);
        Film Update(Film film);
        Film Get(int id);
        List<Film> Get();
        void Delete(int id);

        List<Genre> GetGenres();
        List<Actor> GetActors();

        List<Film> Search(string query);
    }
}
