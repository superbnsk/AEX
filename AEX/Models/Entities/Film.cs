namespace AEX.Models.Entities
{
    public class Film
    {
        public int Id { get; set; }
        public string Title { get; set; }   //название фильма
        public string Description { get; set; }     //описание
        public List<Genre> genres { get; set; } = new();    //жанры фильма
        public List<Actor> actors { get; set; } = new();    //актеры, снявшиеся в фильме

    }
}
