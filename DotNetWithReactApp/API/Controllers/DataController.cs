using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DataController : ControllerBase
    {
        private readonly DataContext _context;
        public DataController(DataContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public IActionResult Date()
        {
            return Ok(DateTime.Now);
        }
        
        [Route("Values")]
        [HttpGet]
        public IActionResult Values()
        {
            var data = _context.Values.ToList();
            return Ok(data);
        }
    }
}