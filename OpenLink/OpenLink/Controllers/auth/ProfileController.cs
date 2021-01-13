using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using OpenLink.Data;
using OpenLink.Models;
using OpenLink.Models.Login;

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



        //// GET: Profile/Details/5
        //public  async Task<ProfileModel> Details(Guid? id)
        //{
        //    if (id == null)
        //    {
        //        return null;
        //    }

        //    var profileModel = await  _context.ProfileModel
        //        .FirstOrDefaultAsync(m => m.ID == id);
        //    if (profileModel == null)
        //    {
        //        return null;
        //    }

        //    return profileModel;
        //}



        // POST: Profile/Register

        [HttpPost("profile/register")]
        public Boolean Register(ProfileModel profileModel)
        {
            try
            {


                profileModel.ID = Guid.NewGuid();
                _context.Add(profileModel);
                Account newAccount = new Account
                {
                    ID = Guid.NewGuid(),
                    Username = profileModel.Username,
                    Password = profileModel.Password,
                    RegisterID = profileModel.ID
                };
                _context.Add(newAccount);

                _context.SaveChangesAsync();
                return true;

            }catch(Exception e)
            {
                return false;
            }
        }

       

        
    }
}
