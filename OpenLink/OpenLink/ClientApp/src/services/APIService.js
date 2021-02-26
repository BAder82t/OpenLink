import axios from 'axios';
import {CONSTANTS} from './Constants';


export function loginAPI(username,password,callback){
   

    var bodyData =JSON.stringify({ 
        username:username,
        password:password
    });
    axios('/auth/login',{
        method:'POST',
        data:bodyData,
        headers: {
            
            'Content-Type': 'application/json'
        }
    }).then(function (response){
        //handle success
        if(response.data.validObject!=null){
            var accessToken = (response.data.validObject.accessToken);
            // console.log("accesstoken :"+accessToken);
            var refreshToken = (response.data.validObject.refreshToken);
            // console.log("refreshToken :"+refreshToken);

            
            // self.redirect("Bearer "+accessToken,refreshToken);
            callback(true,"Bearer "+accessToken,refreshToken)
        }else if(response.data.invalidObject!=null){
            callback(false,response.data.invalidObject);
        }
        console.log(response);
    }).catch(function (error) {
        //handle error
        if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else if(error.message){
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
    });

}

export function register(name,username,password,callback){
  
    var bodyData =JSON.stringify({ 
        Username: username,
        Name: name,
        Password:password
    });

    axios('/profile/register',{
        method:'POST',
        data:bodyData,
        headers: {
            
            'Content-Type': 'application/json'
        }
    
    }).then(function (response){
        //handle success
        if(response.data.validObject!=null){
            loginAPI(username,password,callback);

        }else if(response.data.invalidObject!=null){
            callback(false,response.data.invalidObject);
        }
    console.log(response);
    }).catch(function (response) {
        //handle error
        console.log(response);
    });
}

export function profile(token,callback){
    console.log("Profile token  "+token);
        
        axios('/profile',{
        method:'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }

        }).then(function (response){
        console.log("Profile Response" + response.data.validObject.name);
         callback(response.data)

        }).catch(function (error) {
            //handle error
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
              } else if(error.message){
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
        });
}

export function createAPI(token,api,callback){

    var bodyData =JSON.stringify(api);
    console.log("api body :"+bodyData+"  token :"+token);
    axios('/api/create',{
        method:'POST',
        data:bodyData,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    }).then(function (response){
     
        callback(response.data);
    }).catch(function (error) {
        //handle error
        if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else if(error.message){
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
    });
}
export function getMyAPIs(token,callback){
    if(token.length>0){
        console.log("calling get my apis  "+token);

        axios('/api/getmyapis',{
            method:'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }).then(function (response){
            
           console.log(response.data);
            callback(response.data);
        }).catch(function (error) {
            //handle error
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
              } else if(error.message){
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
        });
    }
    
}
export function searchAPIs(search,pageNum,callback){
       
    var bodyData =JSON.stringify({ 
        searchString: search,
        pageNumber:pageNum
    });

    axios('/api/search',{
        method:'POST',
        data:bodyData,
        headers: {   
            'Content-Type': 'application/json'
        }
    }).then(function (response){
        
        console.log(response.data);
        callback(response.data);
    }).catch(function (error) {
        //handle error
        if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
            } else if(error.message){
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            }
    });
    
    
}

export function addNewComment(comment,id,token,callback){
    var bodyData =JSON.stringify({ 
        message: comment,
        apiid:id
    });

    axios('/api/Comment/addcomment',{
        method:'POST',
        data:bodyData,
        headers: {   
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).then(function (response){
        
        console.log(response.data);
        callback();
    }).catch(function (error) {
        //handle error
        if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
            } else if(error.message){
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            }
    });
    
    
}
export function addNewReply(comment,id,replyID,token,callback){
    var bodyData =JSON.stringify({ 
        message: comment,
        apiid:id,
        replyID:replyID
    });

    axios('/api/Comment/addcomment',{
        method:'POST',
        data:bodyData,
        headers: {   
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).then(function (response){
        
        console.log(response.data);
        callback(response);
    }).catch(function (error) {
        //handle error
        if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
            } else if(error.message){
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            }
    });
    
    
}
export function getComments(id,token,callback){
       
    var bodyData =JSON.stringify({ 
        apiid:id
    });

    axios('/api/Comment/GetAllComments',{
        method:'POST',
        data:bodyData,
        headers: {   
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).then(function (response){
        
        console.log(response.data);
        callback(response.data);
    }).catch(function (error) {
        //handle error
        if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
            } else if(error.message){
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            }
    });
    
    
}


export function voteComment(response,id,token,callback){
    var bodyData =JSON.stringify({ 
        response: response,
        commentID:id
    });

    axios('/api/Comment/vote',{
        method:'POST',
        data:bodyData,
        headers: {   
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).then(function (response){
        
        console.log(response.data);
        callback();
    }).catch(function (error) {
        //handle error
        if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
            } else if(error.message){
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            }
    });
    
    
}
export function getReplies(id,commentID,token,callback){
       
    var bodyData =JSON.stringify({ 
        apiid:id,
        commentID:commentID
    });

    axios('/api/Comment/GetAllReplies',{
        method:'POST',
        data:bodyData,
        headers: {   
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).then(function (response){
        
        console.log(response.data);
        callback(response.data);
    }).catch(function (error) {
        //handle error
        if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
            } else if(error.message){
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            }
    });
    
    
}