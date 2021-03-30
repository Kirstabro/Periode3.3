using EmonApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using EmonApi.Services;

namespace EmonApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SensordataController : ControllerBase
    {
        private readonly SensordataService _sensordataService;

        public SensordataController(SensordataService sensordataService)
        {
            _sensordataService = sensordataService;
        }

        [HttpGet]
        public ActionResult<List<Sensordata>> Get() =>
            _sensordataService.Get();

        [HttpGet ("last/{time}")]
        public ActionResult<Sensordata> GetLast(int time)
        {
            var sensordata = _sensordataService.GetLast(time);

            if (sensordata == null)
            {
                return NotFound();
            }
            return sensordata;
        }

        [HttpGet("{id:length(24)}", Name = "GetSensorData")]
        public ActionResult<Sensordata> Get(string id)
        {
            var sensordata = _sensordataService.Get(id);

            if (sensordata == null)
            {
                return NotFound();
            }
            return sensordata;
        }

        [HttpPost]
        public ActionResult<Sensordata> Create(Sensordata sensordata)
        {
            _sensordataService.Create(sensordata);

            return CreatedAtRoute("GetSensorData", new { id = sensordata.Id.ToString() }, sensordata);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Sensordata sensordataIn)
        {
            var sensordata = _sensordataService.Get(id);

            if (sensordata == null)
            {
                return NotFound();
            }

            _sensordataService.Update(id, sensordataIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var sensordata = _sensordataService.Get(id);

            if (sensordata == null)
            {
                return NotFound();
            }

            _sensordataService.Remove(sensordata.Id);

            return NoContent();
        }
    }
}