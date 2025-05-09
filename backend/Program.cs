using PortfolioApi.DataAccess;
using PortfolioApi.Models;

var builder = WebApplication.CreateBuilder(args);

// --- CORS Policy ---
var corsPolicyName = "AllowStaticWebApp";
var staticWebAppUrl = builder.Configuration["AllowedCorsOrigin"] ?? "YOUR_STATIC_WEB_APP_URL"; // Read from config or use placeholder

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsPolicyName,
                      policy =>
                      {
                          policy.WithOrigins(staticWebAppUrl, "http://localhost:3000", "http://localhost:4200") // Allow SWA, local dev (React?), and local dev (Angular)
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});
// --- End CORS Policy ---

// Add services to the container.
builder.Services.AddScoped<IDataAccess, SqlDataAccess>(); // Register the data access service

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    // Optionally, relax CORS for local development if needed, but specific policy is often better
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts(); // Add HSTS for production
}

// --- Verify/Add HTTPS Redirection ---
app.UseHttpsRedirection(); // This was already present and is important for production

// --- Add CORS Middleware ---
app.UseCors(corsPolicyName); // Apply the CORS policy *before* Authorization

app.UseAuthorization(); // This was already present

app.MapControllers();

app.Run();
