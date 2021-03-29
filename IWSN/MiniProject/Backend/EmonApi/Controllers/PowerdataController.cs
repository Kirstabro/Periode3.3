using EmonApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using EmonApi.Services;


namespace EmonApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PowerdataController : ControllerBase
    {
        private readonly PowerdataService _powerdataService;

        public PowerdataController(PowerdataService powerdataService)
        {
            _powerdataService = powerdataService;
        }

        [HttpGet]
        public ActionResult<List<Powerdata>> Get() =>
            _powerdataService.Get();

        [HttpGet("{id:length(24)}", Name = "GetPowerdata")]
        public ActionResult<Powerdata> Get(string id)
        {
            var powerdata = _powerdataService.Get(id);

            if (powerdata == null)
            {
                return NotFound();
            }

            return powerdata;
        }

        [HttpPost]
        public ActionResult<Powerdata> Create(Powerdata powerdata)
        {
            _powerdataService.Create(powerdata);

            return CreatedAtRoute("GetPowerdata", new { id = powerdata.Id.ToString() }, powerdata);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Powerdata powerdataIn)
        {
            var powerdata = _powerdataService.Get(id);

            if (powerdata == null)
            {
                return NotFound();
            }

            _powerdataService.Update(id, powerdataIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var powerdata = _powerdataService.Get(id);

            if (powerdata == null)
            {
                return NotFound();
            }

            _powerdataService.Remove(powerdata.Id);

            return NoContent();
        }
    }
}