using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
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
    public class LoginController : Controller
    {
        
        private readonly OpenLinkContext _context;

        public LoginController(OpenLinkContext context)
        {
            _context = context;
        }

        // GET: Login

        //// GET: get all acounts
        //[HttpGet("auth/loginall")]
        //public ResponseObject GetAll()

        //{
        //    if (!_context.Account.Any())
        //    {
        //        return new ResponseObject(null,false);
        //    }
        //    else
        //    {
        //        return new ResponseObject(_context.Account.ToList(),true);
        //    }
            

        //}

        [HttpGet("auth/logout")]
        public ActionResult<ResponseObject> Logout()
        {
            ResponseObject obj = TokenGenerator.ValidateToken(this);

            if (!obj.Valid)
            {
                return new ResponseObject("An error Occured", false);
            }
            var header = AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]);
            if (header == null)
            {

                return new ResponseObject(null, false);
            }
            string credentials = header.Parameter;
            AccountResult account = _context.Tokens.Where(x => x.AccessToken == credentials).FirstOrDefault();

            _context.Tokens.Remove(account);
            _context.SaveChanges();
            return new ResponseObject(true, true);

        }
        [HttpPost("auth/refersh")]

        public ActionResult<ResponseObject> Refresh(RefreshModel refresh)
        {
            
            AccountResult account = _context.Tokens.Where(x => x.RefreshToken == refresh.Refersh).FirstOrDefault();
           

            String accesstoken = new TokenGenerator().GenerateToken(account.AccountID);
            string refreshtoken = new TokenGenerator().GenerateRefreshToken();

            AccountResult accountResult = new AccountResult
            {
                IsValid = true,
                AccessToken = accesstoken,
                RefreshToken = refreshtoken,
                ID = Guid.NewGuid(),
                AccountID =account.AccountID
            };

            _context.Entry(accountResult).State = EntityState.Added;
            _context.Tokens.Remove(account);
            _context.SaveChanges();


            return new ResponseObject(accountResult, true);

        }
        
        [HttpPost("auth/login")]

        public ActionResult<ResponseObject> Login(Account account)
        {
            //check login info

            //account.ID = Guid.NewGuid().ToString();
            //_context.Add(account);
            //_context.SaveChanges();

            Account validAccount = _context.Account.Where(x => x.Username == account.Username).FirstOrDefault();

            if (validAccount == null)
            {
                return new ResponseObject("Account not found", false);
            }else if (validAccount.Password != account.Password)
            {
                return new ResponseObject("Password is Incorrect", false);
            }
            

            String accesstoken = new TokenGenerator().GenerateToken(validAccount.ID);
            string refreshtoken = new TokenGenerator().GenerateRefreshToken();

            AccountResult accountResult = new AccountResult
            {
                IsValid = true,
                AccessToken = accesstoken,
                RefreshToken = refreshtoken,
                ID = Guid.NewGuid(),
                AccountID = validAccount.ID
            };

            _context.Entry(accountResult).State = EntityState.Added;
            _context.SaveChanges();

            return new ResponseObject(accountResult, true);

        }


    }
}
