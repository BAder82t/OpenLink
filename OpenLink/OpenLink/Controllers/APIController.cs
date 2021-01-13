using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OpenLink.Data;
using OpenLink.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpenLink.Controllers
{

    [ApiController]
    public class APIController : ControllerBase
    {
        private readonly OpenLinkContext _context;

        public APIController(OpenLinkContext context)
        {
            _context = context;
        }
        [HttpGet("api/getAll")]
        public IEnumerable<APIModel> GetAll()

        {
            if (_context.Account.Any())
            {
                return null;
            }
            else
            {
                return _context.APIModels.ToList();
            }


        }
        [HttpGet("api")]
        public ActionResult<APIModel> Get()

        {
            Guid id = Guid.NewGuid();
            List<Link> links = new List<Link>();
            Link link = new Link
            {
                ID = Guid.NewGuid(),
                InputData = "this is the data to input",
                OutputData = "this is the data to output",
                APIID = id,
                Description = "this is the link description",
                URL = "https://this is the url.com"
            };
            links.Add(link);
            return new APIModel
            {
                ID = id,
                UserID = Guid.NewGuid(),
                Title = "Title",
                Description = "this Discription is 12234",
                Links = links

            };


        }
    }
}
