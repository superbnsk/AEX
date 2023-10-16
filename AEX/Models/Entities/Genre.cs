namespace AEX.Models.Entities
{
    //Жанр
    public class Genre
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Film> films { get; set; } = new();  //
    }
}
