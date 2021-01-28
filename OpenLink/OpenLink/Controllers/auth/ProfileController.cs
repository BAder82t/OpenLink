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
        public ResponseObject Register(ProfileRegisterModel profileModel)
        {
            try
            {
                

                profileModel.ID = Guid.NewGuid();
                
                Account newAccount = new Account
                {
                    ID = Guid.NewGuid(),
                    Username = profileModel.Username,
                    Password = profileModel.Password,
                    RegisterID = profileModel.ID
                };
                //_context.ProfileModel.Add(profileModel);
                _context.Entry(profileModel).State = EntityState.Added;
                //_context.Account.Add(newAccount);
                _context.Entry(newAccount).State = EntityState.Added;

                _context.SaveChangesAsync();

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

                ProfileRegisterModel profile  = _context.ProfileModel
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
            var header = AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]);
            var credentials = header.Parameter;
            JwtSecurityToken token = TokenGenerator.VerifyAndDecodeJwt(credentials);


            var claim = token.Claims;
            var list = claim.ToList();
            var idclaim = list?.FirstOrDefault(x => x.Type.Equals("nameid", StringComparison.OrdinalIgnoreCase))?.Value;
            Guid id = Guid.Parse(idclaim);
            return null;

        }
       
    }
}
