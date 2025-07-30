using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CazuelaBackend.Data;
using CazuelaBackend.Models;

namespace CazuelaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CombosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CombosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/combos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Combo>>> GetCombos()
        {
            return await _context.Combos.ToListAsync();
        }

        // GET: api/combos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Combo>> GetCombo(int id)
        {
            var combo = await _context.Combos.FindAsync(id);
            if (combo == null)
                return NotFound();
            return combo;
        }

        // POST: api/combos
        [HttpPost]
        public async Task<ActionResult<Combo>> PostCombo(Combo combo)
        {
            _context.Combos.Add(combo);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCombo), new { id = combo.Id }, combo);
        }

        // PUT: api/combos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCombo(int id, Combo updatedCombo)
        {
            if (id != updatedCombo.Id)
                return BadRequest();

            _context.Entry(updatedCombo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ComboExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/combos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCombo(int id)
        {
            var combo = await _context.Combos.FindAsync(id);
            if (combo == null)
                return NotFound();

            _context.Combos.Remove(combo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ComboExists(int id)
        {
            return _context.Combos.Any(e => e.Id == id);
        }
    }
}
