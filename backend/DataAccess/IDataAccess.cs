using PortfolioApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PortfolioApi.DataAccess
{
    public interface IDataAccess
    {
        Task<IEnumerable<Project>> GetProjectsAsync();
        Task<IEnumerable<Skill>> GetSkillsAsync();
    }
}
