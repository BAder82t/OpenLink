using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenLink.Data;
using OpenLink.Models;
using OpenLink.Models.API;
using OpenLink.Models.Login;
using OpenLink.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpenLink.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {


        private readonly OpenLinkContext _context;


        public CommentController(OpenLinkContext context)
        {
            _context = context;
        }

        [HttpPost("GetAllComments")]
        public ResponseObject GetComments(GetCommentsModel model)
        {
            try
            {

                var comments = _context.Comments.Where(s => s.APIID == model.APIID);
                comments = comments.Where(s => s.ReplyID == Guid.Empty);
                comments.OrderByDescending(x => x.RealDate);



                return new ResponseObject(comments, true);
            }
            catch (Exception e)
            {
                return new ResponseObject(e, false);
            }
        }


        //[HttpPost("api/addVote")]
        //public ResponseObject AddCommentVote(CommentVoteResponse response)
        //{
        //    try
        //    {
        //        ResponseObject obj = TokenGenerator.ValidateToken(this);

        //        if (!obj.Valid)
        //        {
        //            return new ResponseObject("An error Occured", false);
        //        }
        //        Guid id = (Guid)obj.ValidObject;
        //        Account validAccount = _context.Account.Where(x => x.ID == id).FirstOrDefault();
        //        Guid profileID = validAccount.RegisterID;
        //    }
        //    catch (Exception e)
        //    {
        //        return new ResponseObject(e, false);
        //    }
        //}





        [HttpPost("addcomment")]
        public ResponseObject AddComment(SendCommentModel comment)
        {
            try
            {

                ResponseObject obj = TokenGenerator.ValidateToken(this);

                if (!obj.Valid)
                {
                    return new ResponseObject("User not valid", false);
                }
                Guid id = (Guid)obj.ValidObject;
                Account validAccount = _context.Account.Where(x => x.ID == id).FirstOrDefault();
                Guid profileID = validAccount.RegisterID;
                ProfileModel profile = _context.ProfileModel.Where(p => p.ID == profileID).FirstOrDefault();

                CommentModel commentModel = new CommentModel
                {
                    ID = Guid.NewGuid(),
                    APIID = comment.APIID,
                    UserID = profileID,
                    Messege = comment.Message,
                    Date = DateTime.Now.ToString("yyyy-MM-ddTHH:mm:ss.fffff:zz"),
                    RealDate =DateTime.Now,
                    ReplyID = comment.ReplyID,
                    Name = profile.Name,
                    Vote = 0
                };

                _context.Entry(commentModel).State = EntityState.Added;
                _context.SaveChanges();

                return new ResponseObject(commentModel, true);
            }
            catch (Exception e)
            {
                return new ResponseObject(e, false);
            }

        }
    }
}
