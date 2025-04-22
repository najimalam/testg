using Microsoft.AspNetCore.Mvc;
using PortfolioApi.DataAccess;
using PortfolioApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PortfolioApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly IDataAccess _dataAccess;

        public ProjectsController(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            var projects = await _dataAccess.GetProjectsAsync();
            // In a real scenario, you might add error handling (try-catch)
            // or check if projects is null/empty and return NotFound if appropriate.
            return Ok(projects);
        }
    }
}
