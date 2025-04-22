using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using PortfolioApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PortfolioApi.DataAccess
{
    public class SqlDataAccess : IDataAccess
    {
        private readonly IConfiguration _configuration;

        public SqlDataAccess(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private string ConnectionString => _configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

        public async Task<IEnumerable<Project>> GetProjectsAsync()
        {
            using var connection = new SqlConnection(ConnectionString);
            // Updated query to use dbo schema
            var sql = "SELECT Id, Title, Description, ImageUrl, ProjectUrl FROM dbo.Projects;";
            return await connection.QueryAsync<Project>(sql);
        }

        public async Task<IEnumerable<Skill>> GetSkillsAsync()
        {
            using var connection = new SqlConnection(ConnectionString);
            // Updated query to use dbo schema
            var sql = "SELECT Id, Name, ProficiencyLevel FROM dbo.Skills;";
            return await connection.QueryAsync<Skill>(sql);
        }
    }
}
