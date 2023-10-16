using AEX.Models.Entities;
using AEX.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AEX.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilmsController : ControllerBase
    {
        private IFilmsService _filmsService;

        public FilmsController(IFilmsService filmsService)
        {
            _filmsService = filmsService;
        }

        //CRUD для списка фильмов
        [HttpPost]
        public Film Create(Film film)
        {
            return _filmsService.Create(film);
        }

        [HttpPatch]
        public Film Update(Film film)
        {
            return _filmsService.Update(film);
        }

        [HttpGet("{id}")]
        public Film Get(int id)
        {
            return _filmsService.Get(id);
        }

        [HttpGet]
        public List<Film> GetAll()
        {
            return _filmsService.Get();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _filmsService.Delete(id);
            return Ok();
        }

        //получение списка актёров
        [HttpGet("actors")]
        public List<Actor> GetActors()
        {
            return _filmsService.GetActors();
        }

        //получение списка жанров
        [HttpGet("genres")]
        public List<Genre> GetGenres()
        {
            return _filmsService.GetGenres();
        }

        //поиск
        [HttpGet("search={query}")]
        public List<Film> Search(string query)
        {
            return _filmsService.Search(query);
        }
    }
}
