using AEX.Data;
using AEX.Services.Interfaces;
using AEX.Services;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

//для отношения многие-ко-многим
builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddTransient<IFilmsService, FilmsService>();
//builder.Services.AddSingleton<MyDataContext>();   //для тестов без бд

//получаем строку подключения к бд из файла конфигурации
string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

//добавляем контекст MyDataContext в качестве сервиса в приложение
builder.Services.AddDbContext<MyDataContext>(options => options.UseSqlServer(connectionString));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
}

app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
