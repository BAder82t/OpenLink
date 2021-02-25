using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenLink.Data;
using OpenLink.Models;
using OpenLink.Models.API;
using OpenLink.Models.Comments;
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


        [HttpPost("GetAllReplies")]
        public ResponseObject GetReplies(GetReplyModel model)
        {
            try
            {
                bool isloggedin = false;
                Guid profileID = Guid.Empty;

                ResponseObject obj = TokenGenerator.ValidateToken(this);
                if (obj != null)
                {
                    Guid id = (Guid)obj.ValidObject;
                    Account validAccount = _context.Account.Where(x => x.ID == id).FirstOrDefault();
                    profileID = validAccount.RegisterID;
                    isloggedin = true;
                }




                var comments = _context.Comments.Where(s => s.APIID == model.APIID);
                comments = comments.Where(s => s.ReplyID == model.CommentID);

                if (isloggedin)
                {
                    var votes = _context.Votes.Where(x => x.UserID == profileID).ToList();
                    var myVotes = votes.Where(y => y.APIID == model.APIID).ToList();


                    foreach (var vote in myVotes)
                    {
                        foreach (var comment in comments)
                        {
                            if (vote.CommentID == comment.ID)
                            {
                                if (vote.Response)
                                {
                                    comment.DidVote = 1;
                                }
                                else
                                {
                                    comment.DidVote = 2;
                                }

                                continue;
                            }

                        }

                    }
                }
                comments = comments.OrderByDescending(x => x.RealDate);
                return new ResponseObject(comments, true);
            }
            catch (Exception e)
            {
                return new ResponseObject(e, false);
            }
        }

        [HttpPost("GetAllComments")]
        public ResponseObject GetComments(GetCommentsModel model)
        {
            try
            {
                bool isloggedin = false;
                Guid profileID = Guid.Empty;
                
                ResponseObject obj = TokenGenerator.ValidateToken(this);
                if (obj != null)
                {
                    Guid id = (Guid)obj.ValidObject;
                    Account validAccount = _context.Account.Where(x => x.ID == id).FirstOrDefault();
                    profileID = validAccount.RegisterID;
                    isloggedin = true;
                }
                    
                


                var comments = _context.Comments.Where(s => s.APIID == model.APIID);
                comments = comments.Where(s => s.ReplyID == Guid.Empty);

                if (isloggedin)
                {
                    var votes = _context.Votes.Where(x => x.UserID == profileID).ToList();
                    var myVotes = votes.Where(y => y.APIID == model.APIID).ToList();


                    foreach (var vote in myVotes)
                    {
                        foreach(var comment in comments)
                        {
                            if(vote.CommentID == comment.ID)
                            {
                                if (vote.Response)
                                {
                                    comment.DidVote = 1;
                                }
                                else
                                {
                                    comment.DidVote = 2;
                                }
                                
                                continue;
                            }
                            
                        }
                            
                    }
                }
                comments = comments.OrderByDescending(x => x.RealDate);
                return new ResponseObject(comments, true);
            }
            catch (Exception e)
            {
                return new ResponseObject(e, false);
            }
        }


        [HttpPost("vote")]
        public ResponseObject AddVote(CommentVoteResponse response)
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

                CommentModel comment = _context.Comments.Where(x => x.ID == response.CommentID).FirstOrDefault();
                if (response.Response)
                {
                    comment.Vote = comment.Vote+1;
                }
                else
                {
                    comment.Vote = comment.Vote-1;
                }
                CommentVoteModel voteModel = new CommentVoteModel
                {
                    APIID = comment.APIID,
                    ID = Guid.NewGuid(),
                    CommentID = response.CommentID,
                    UserID = profileID,
                    Response = response.Response,
                };

                _context.Entry(voteModel).State = EntityState.Added;
                var entry = _context.Entry(comment);
                entry.Property(e => e.Vote).IsModified = true;
                _context.SaveChanges();


                return new ResponseObject(comment, true);
                
            }
            catch (Exception e)
            {
                return new ResponseObject(e, false);
            }
        }

        [HttpGet("getVotes")]
        public ResponseObject GetVotes()
        {
            if (!_context.Votes.Any())
            {
                return new ResponseObject(null, false);
            }
            else
            {
                List<CommentVoteModel> models = _context.Votes.ToList();


                return new ResponseObject(models, true);
            }

        }





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
                    DidVote =0,
                    Date = DateTime.Now.ToString("yyyy-MM-ddTHH:mm:ss.fffff:zz"),
                    RealDate =DateTime.Now,
                    ReplyID = comment.ReplyID,
                    Name = profile.Name,
                    Vote = 0,
                    ReplyNum=0
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

        [HttpGet("deleteAll")]
        public ResponseObject DeleteAll()
        {
            var rows = from o in _context.Comments select o;
            foreach (var row in rows)
            {
                _context.Comments.Remove(row);
            }
            var rowsVotes = from o in _context.Votes select o;
            foreach (var row in rowsVotes)
            {
                _context.Votes.Remove(row);
            }
            _context.SaveChanges();
            return new ResponseObject(true, true);
        }

    }
}
