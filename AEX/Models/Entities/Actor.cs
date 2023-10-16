namespace AEX.Models.Entities
{
    public class Actor
    {
        public int Id { get; set; }
        public string Name { get; set; }    //имя актера
        public string Surname { get; set; }     //фамилия
        public int Age { get; set; }    //возраст
        public List<Film> films { get; set; } = new();  //фильмы, в которых снимался актер
    }
}
