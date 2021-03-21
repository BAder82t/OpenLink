using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenLink.Data;
using OpenLink.Models;
using OpenLink.Models.API;
using OpenLink.Models.Bookmarks;
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

        [HttpGet("api/getMyAPIs")]
        public ResponseObject getMyAPIs()
        {
            ResponseObject obj = TokenGenerator.ValidateToken(this);

            if (!obj.Valid)
            {
                return new ResponseObject((Exception)obj.InvalidObject, false);
            }
            Guid id = (Guid)obj.ValidObject;
            Account validAccount = _context.Account.Where(x => x.ID == id).FirstOrDefault();
            Guid profileID = validAccount.RegisterID;

            if (!_context.Account.Any())
            {
                return new ResponseObject(null, false);
            }
            else
            {
                List<APIModel> models = _context.APIModels.Where(x => x.UserID == profileID).ToList();

                foreach (APIModel model in models)
                {
                    model.Links = _context.Links.Where(x => x.APIID == model.ID).ToList();
                }

                return new ResponseObject(models, true);
            }

        }

        [HttpGet("api/deleteAll")]
        public ResponseObject DeleteAll()
        {
            var rowsLink = from o in _context.Links select o;
            foreach (var row in rowsLink)
            {
                _context.Links.Remove(row);
            }
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
                model.Date = DateTime.Now.ToString("yyyy-MM-ddTHH:mm:ss.fffff:zz");
                model.RealDate = DateTime.Now;
                model.UserID = profile.ID;
                model.ID = Guid.NewGuid();
                model.Name = profile.Name;
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
        public async Task<ResponseObject> Search(SearchModel searchModel)
        {
            try
            {
                List<APIModel> models = new List<APIModel>();
                var apis = from m in _context.APIModels select m;
                int numberOfAPIS = 2;
                if (!String.IsNullOrEmpty(searchModel.SearchString))
                {
                    apis = apis.Where(s => s.Title.Contains(searchModel.SearchString) || s.Description.Contains(searchModel.SearchString)
                        || s.Name.Contains(searchModel.SearchString));

                }
                else
                {
                    apis = _context.APIModels;
                }
                models = await apis.ToListAsync();
                foreach (APIModel model in models)
                {
                    model.Links = _context.Links.Where(x => x.APIID == model.ID).ToList();
                }
                var count = models.Count();
                int max = count / numberOfAPIS;
                if (count % numberOfAPIS > 0)
                {
                    max++;
                }
                int skipNum = numberOfAPIS * searchModel.PageNumber;
                var list= models.Skip(skipNum).Take(numberOfAPIS);

                ObjectListModel objectListModel = new ObjectListModel
                {
                    Obj = max,
                    List = list
                }
               ;
                return new ResponseObject(objectListModel, true);
            }catch(Exception e)
            {
                return new ResponseObject(e, false);
            }
        }

        [HttpGet("api/myapis")]
        public  ResponseObject GetMyAPIs()
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
                foreach (APIModel model in models)
                {
                    model.Links =  _context.Links.Where(x => x.APIID == model.ID).ToList();
                }
                models.OrderByDescending(x => x.RealDate);
                return new ResponseObject(models, true);


            }
            catch(Exception e)
            {
                return new ResponseObject(e, false);
            }

        }

        [HttpPost("api/bookmark")]
        public ResponseObject Bookmark(BookmarkedAPI api)
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

            BookmarkedModel model = new BookmarkedModel
            {
                ID = Guid.NewGuid(),
                APIID = api.APIID,
                UserID = profileID
            };
            _context.Entry(model).State = EntityState.Added;
            _context.SaveChanges();
            return new ResponseObject(model, true);
        }


    }

    
}
