import axios from 'axios';
import {CONSTANTS} from './Constants';


export function loginAPI(username,password,callback){
    const endPoint = CONSTANTS.MAINURL+'/auth/login';

    var bodyData =JSON.stringify({ 
        username:username,
        password:password
    });
    axios({
        method:'POST',
        url: endPoint,
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
    const endPoint = CONSTANTS.MAINURL+'/profile/register';

    var bodyData =JSON.stringify({ 
        username: username,
        name: name,
        password:password
    });

    axios({
        method:'POST',
        url:endPoint,
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
    const endPoint = CONSTANTS.MAINURL+'/profile';
    
    console.log("Profile token  "+token);
        
        axios({
          method:'GET',
          url:endPoint,
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
    const endPoint = CONSTANTS.MAINURL+'/api/create';

    var bodyData =JSON.stringify(api);
    console.log("api body :"+bodyData+"  token :"+token);
    axios({
        method:'POST',
        url:endPoint,
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
    const endPoint = CONSTANTS.MAINURL+'/api/getmyapis';
    if(token.length>0){
        console.log("calling get my apis  "+token);

        axios({
            method:'GET',
            url:endPoint,
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
    const endPoint = CONSTANTS.MAINURL+'/api/search';
       
    var bodyData =JSON.stringify({ 
        searchString: search,
        pageNumber:pageNum
    });

    axios({
        method:'POST',
        url:endPoint,
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
    const endPoint = CONSTANTS.MAINURL+'/api/Comment/addcomment';
    var bodyData =JSON.stringify({ 
        message: comment,
        apiid:id
    });

    axios({
        method:'POST',
        url:endPoint,
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
export function getComments(id,token,callback){
    const endPoint = CONSTANTS.MAINURL+'/api/Comment/GetAllComments';
       
    var bodyData =JSON.stringify({ 
        apiid:id
    });

    axios({
        method:'POST',
        url:endPoint,
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
    const endPoint = CONSTANTS.MAINURL+'/api/Comment/vote';
    var bodyData =JSON.stringify({ 
        response: response,
        commentID:id
    });

    axios({
        method:'POST',
        url:endPoint,
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