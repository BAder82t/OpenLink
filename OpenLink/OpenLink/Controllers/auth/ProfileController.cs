using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using OpenLink.Data;
using OpenLink.Interfaces;
using OpenLink.Models;
using OpenLink.Models.Bookmarks;
using OpenLink.Models.Login;
using OpenLink.Service;

namespace OpenLink.Controllers.auth
{
    [ApiController]
    public class ProfileController : Controller
    {
        private readonly OpenLinkContext _context;
        

        public ProfileController(OpenLinkContext context)
        {
            _context = context;
        }





        [HttpPost("profile/register")]
        public async  Task<ResponseObject> Register(ProfileRegisterModel profileModel)
        {
            try
            {
                var exists = _context.Account.Any(x => x.Username == profileModel.Username);
                if (exists)
                {
                    return new ResponseObject("This username already exists",false);
                }
                var existsName = _context.ProfileModel.Any(x => x.Name == profileModel.Name);
                if (existsName)
                {
                    return new ResponseObject("This name already exists", false);
                }
                ProfileModel profileToSave = new ProfileModel
                {
                    ID = Guid.NewGuid(),
                    Username = profileModel.Username,
                    Name = profileModel.Name



                };
                Account newAccount = new Account
                {
                    ID = Guid.NewGuid(),
                    Username = profileToSave.Username,
                    Password = profileModel.Password,
                    RegisterID = profileToSave.ID
                };
                //_context.ProfileModel.Add(profileModel);
                _context.Entry(profileToSave).State = EntityState.Added;
                //_context.Account.Add(newAccount);
                _context.Entry(newAccount).State = EntityState.Added;

                await _context.SaveChangesAsync();

                return new ResponseObject(true, true);

            }catch(Exception e)
            {
                return new ResponseObject(e, false);
            }
        }

        //// GET: get all acounts
        //[HttpGet("profile/getAll")]
        //public ResponseObject GetAll()

        //{
        //    if (!_context.ProfileModel.Any())
        //    {
        //        return new ResponseObject(null, false);
        //    }
        //    else
        //    {
        //        return new ResponseObject(_context.ProfileModel.ToList(), true);
        //    }


        //}
        [HttpGet("profile/delete/{id}")]
        public ResponseObject Delete(Guid id)
        {
            try
            {

                ProfileModel profile  = _context.ProfileModel
                    .Where(s => s.ID == id)
                    .FirstOrDefault();
                Account account = _context.Account.Where(s => s.RegisterID == id).FirstOrDefault();

                _context.Entry(account).State = EntityState.Deleted;
                _context.Entry(profile).State = EntityState.Deleted;
                _context.SaveChanges();


                return new ResponseObject("deleted", true);

            }
            catch (Exception e)
            {
                return new ResponseObject(e, false);
            }
        }

        [HttpGet("profile")]
        public  ResponseObject GetProfile()
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

                return new ResponseObject(profile, true);
            }catch(Exception e)
            {
                return new ResponseObject(e, false);
            }
            

        }
        [HttpGet("profile/getBookmarks")]
        public ResponseObject GetAll()

        {
            ResponseObject obj = TokenGenerator.ValidateToken(this);

            if (!obj.Valid)
            {
                return new ResponseObject("An error Occured", false);
            }
            Guid id = (Guid)obj.ValidObject;
            Account validAccount = _context.Account.Where(x => x.ID == id).FirstOrDefault();
            Guid profileID = validAccount.RegisterID;

            List<BookmarkedModel> bookmarks = _context.Bookmarks.Where(x => x.UserID == profileID).ToList();

            if (bookmarks.Count > 0)
            {
                return new ResponseObject(bookmarks, true);
            }
            else
            {
                return new ResponseObject("You have no bookmarks", false);
            }
            
            


        }

    }
}
