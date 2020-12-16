using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using OpenLink.Data;
using OpenLink.Models;

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
                ID =1

            };

            return myAccount;
            
        }
        [HttpPost("auth/login")]

        public ActionResult<AccountResult> Login(Account account)
        {
            //check login info
            //create access token and refresh token

            return new AccountResult
            {
                IsValid=true,
                AccessToken ="accessToken",
                RefreshToken="refreshToken"
            };

        }
    }
}
