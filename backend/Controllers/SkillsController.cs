using Microsoft.AspNetCore.Mvc;
using PortfolioApi.DataAccess;
using PortfolioApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PortfolioApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SkillsController : ControllerBase
    {
        private readonly IDataAccess _dataAccess;

        public SkillsController(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Skill>>> GetSkills()
        {
            var skills = await _dataAccess.GetSkillsAsync();
            // Similar to ProjectsController, add error handling as needed.
            return Ok(skills);
        }
    }
}
