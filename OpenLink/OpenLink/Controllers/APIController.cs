using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenLink.Data;
using OpenLink.Models;
using OpenLink.Models.Login;
using OpenLink.Service;
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
            if (_context.APIModels.Any())
            {
                return null;
            }
            else
            {
                return _context.APIModels.ToList();
            }


        }
        //[HttpGet("api")]
        //public ActionResult<APIModel> Get()

        //{
        //    Guid id = Guid.NewGuid();
        //    List<Link> links = new List<Link>();
        //    Link link = new Link
        //    {
        //        ID = Guid.NewGuid(),
        //        InputData = "this is the data to input",
        //        OutputData = "this is the data to output",
        //        APIID = id,
        //        Description = "this is the link description",
        //        URL = "https://this is the url.com"
        //    };
        //    links.Add(link);
        //    return new APIModel
        //    {
        //        ID = id,
        //        UserID = Guid.NewGuid(),
        //        Title = "Title",
        //        Description = "this Discription is 12234",
        //        Links = links

        //    };


        //}
        [HttpPost("api/create")]
        public ResponseObject Create(APIModel model)
        {
            try
            {
                ResponseObject obj = TokenGenerator.ValidateToken(this);

                if (!obj.Valid)
                {
                    return new ResponseObject("An error Occured", false);
                }
                Guid id = (Guid)obj.ValidObject;
                Account validAccount = _context.Account.Where(x => x.ID == id).FirstOrDefault();
                Guid profileID = validAccount.RegisterID;
                ProfileModel profile = _context.ProfileModel.Where(p => p.ID == profileID).FirstOrDefault();
                model.Date = DateTime.Now;
                model.UserID = profile.ID;
                model.ID = Guid.NewGuid();

                _context.Entry(model).State = EntityState.Added;
                _context.SaveChanges();
                return new ResponseObject(true,true);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                return new ResponseObject(e,false);
            }
        }


        [HttpPost("api/search")]
        public async Task<ResponseObject> Search(String searchString)
        {
            try
            {
                List<APIModel> models = new List<APIModel>();
                var apis = from m in _context.APIModels select m;
                if (!String.IsNullOrEmpty(searchString))
                {
                    apis = apis.Where(s => s.Title.Contains(searchString));

                }
                models = await apis.ToListAsync();
                return new ResponseObject(models, true);
            }catch(Exception e)
            {
                return new ResponseObject(e, false);
            }
        }

        [HttpGet("api/myapis")]
        public async Task<ResponseObject> GetMyAPIs()
        {
            try
            {
                ResponseObject obj = TokenGenerator.ValidateToken(this);

                if (!obj.Valid)
                {
                    return new ResponseObject("An error Occured", false);
                }
                Guid id = (Guid)obj.ValidObject;
                Account validAccount = _context.Account.Where(x => x.ID == id).FirstOrDefault();
                Guid profileID = validAccount.RegisterID;
                ProfileModel profile = _context.ProfileModel.Where(p => p.ID == profileID).FirstOrDefault();
                List<APIModel> models = _context.APIModels.Include(x => x.UserID == profile.ID).ToList();

                models.OrderByDescending(x => x.Date);
                return new ResponseObject(models, true);


            }
            catch(Exception e)
            {
                return new ResponseObject(e, false);
            }

        }
    }
}
