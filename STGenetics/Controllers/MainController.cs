using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using STGenetics.Models;
using STGenetics.Models.contexts;

namespace STGenetics.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MainController : ControllerBase
    {
        private readonly MainDBContext _dbContext;

        public MainController(MainDBContext context)
        {
            _dbContext = context;
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> List()
        {
            List<Element> lista = await _dbContext.Element.OrderByDescending(c => c.Id).ToListAsync();
            return Ok(lista);
        }


        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromBody] Element request)
        {
            await _dbContext.Element.AddAsync(request);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> Editar([FromBody] Element request)
        {
            _dbContext.Element.Update(request);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("delete/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            _dbContext.Element.Remove(_dbContext.Element.Find(id));
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
