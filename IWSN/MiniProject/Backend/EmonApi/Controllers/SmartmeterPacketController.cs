using EmonApi.Models;
using EmonApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace EmonApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SmartmeterPacketsController : ControllerBase
    {
        private readonly SmartmeterPacketService _SmartmeterPacketService;

        public SmartmeterPacketsController(SmartmeterPacketService SmartmeterPacketService)
        {
            _SmartmeterPacketService = SmartmeterPacketService;
        }

        [HttpGet]
        public ActionResult<List<SmartmeterPacket>> Get() =>
            _SmartmeterPacketService.Get();

        [HttpGet("{id:length(24)}", Name = "GetSmartmeterPacket")]
        public ActionResult<SmartmeterPacket> Get(string id)
        {
            var SmartmeterPacket = _SmartmeterPacketService.Get(id);

            if (SmartmeterPacket == null)
            {
                return NotFound();
            }

            return SmartmeterPacket;
        }

        [HttpPost]
        public ActionResult<SmartmeterPacket> Create(SmartmeterPacket SmartmeterPacket)
        {
            _SmartmeterPacketService.Create(SmartmeterPacket);

            return CreatedAtRoute("GetSmartmeterPacket", new { id = SmartmeterPacket.Id.ToString() }, SmartmeterPacket);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, SmartmeterPacket SmartmeterPacketIn)
        {
            var SmartmeterPacket = _SmartmeterPacketService.Get(id);

            if (SmartmeterPacket == null)
            {
                return NotFound();
            }

            _SmartmeterPacketService.Update(id, SmartmeterPacketIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var SmartmeterPacket = _SmartmeterPacketService.Get(id);

            if (SmartmeterPacket == null)
            {
                return NotFound();
            }

            _SmartmeterPacketService.Remove(SmartmeterPacket.Id);

            return NoContent();
        }
    }
}