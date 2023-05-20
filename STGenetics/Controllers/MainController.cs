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

        /// <summary>
        /// List all elements
        /// </summary>
        /// <returns>Element list</returns>
        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> List()
        {
            List<Element> lista = await _dbContext.Element.OrderByDescending(c => c.Id).ToListAsync();
            return Ok(lista);
        }

        /// <summary>
        /// Create a new element
        /// </summary>
        /// <param name="request">Element to create</param>
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromBody] Element request)
        {
            await _dbContext.Element.AddAsync(request);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        /// <summary>
        /// Update a element
        /// </summary>
        /// <param name="request">Element to update</param>
        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> Editar([FromBody] Element request)
        {
            _dbContext.Element.Update(request);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        /// <summary>
        /// Delete a element
        /// </summary>
        /// <param name="id">Identifier</param>
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
