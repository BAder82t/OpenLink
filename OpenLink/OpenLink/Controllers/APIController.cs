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
        public ResponseObject GetAll()
        {
            if (!_context.Account.Any())
            {
                return new ResponseObject(null, false);
            }
            else
            {
                List<APIModel> models = _context.APIModels.ToList();

                foreach(APIModel model in models)
                {
                    model.Links = _context.Links.Where(x => x.APIID == model.ID).ToList();
                }

                return new ResponseObject(models, true);
            }

        }

        [HttpGet("api/deleteAll")]
        public ResponseObject DeleteAll()
        {
            var rows = from o in _context.APIModels select o;
            foreach (var row in rows)
            {
                _context.APIModels.Remove(row);
            }
            _context.SaveChanges();
            return new ResponseObject(true, true);
        }



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
                foreach(Link link in model.Links)
                {
                    link.ID = Guid.NewGuid();
                    link.APIID = model.ID;
                    _context.Entry(link).State = EntityState.Added;
                }

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
