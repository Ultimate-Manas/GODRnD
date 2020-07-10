using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CrudController : ControllerBase
    {
        [Route("Get")]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Sample");
        }
    }
}