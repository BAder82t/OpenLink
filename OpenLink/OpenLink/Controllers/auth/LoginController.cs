using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using OpenLink.Data;
using OpenLink.Models;
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
        [HttpGet("auth/login")]
        public ActionResult<Account> Get()
        {
            Account myAccount= new Account
            {
                Username ="TEst",
                Password ="PAssword",
                ID =new Guid()

            };
            

            return myAccount;
            
        }
        // GET: get all acounts
        [HttpGet("auth/loginall")]
        public ResponseObject GetAll()

        {
            if (!_context.Account.Any())
            {
                return new ResponseObject(null,false);
            }
            else
            {
                return new ResponseObject(_context.Account.ToList(),true);
            }
            

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

            String accesstoken = new TokenGenerator().GenerateToken(account.ID);
            string refreshtoken = new TokenGenerator().GenerateRefreshToken();

            AccountResult accountResult= new AccountResult
            {
                IsValid=true,
                AccessToken =accesstoken,
                RefreshToken=refreshtoken
            };

            return new ResponseObject(accountResult, true);

        }


    }
}
