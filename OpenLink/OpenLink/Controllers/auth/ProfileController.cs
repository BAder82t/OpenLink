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
using OpenLink.Models;
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

        // GET: get all acounts
        [HttpGet("profile/getAll")]
        public ResponseObject GetAll()

        {
            if (!_context.ProfileModel.Any())
            {
                return new ResponseObject(null, false);
            }
            else
            {
                return new ResponseObject(_context.ProfileModel.ToList(), true);
            }


        }
        [HttpGet("profile/delete/{id}")]
        public ResponseObject Delete(Guid id)
        {
            try
            {

                ProfileModel profile  = _context.ProfileModel
                    .Where(s => s.ID == id)
                    .FirstOrDefault();

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
                Guid id = TokenGenerator.ValidateToken(this);

                Account validAccount = _context.Account.Where(x => x.ID == id).FirstOrDefault();
                Guid profileID = validAccount.RegisterID;
                ProfileModel profile = _context.ProfileModel.Where(p => p.ID == profileID).FirstOrDefault();

                return new ResponseObject(profile, true);
            }catch(Exception e)
            {
                return new ResponseObject(e, false);
            }
            

        }
       
    }
}
