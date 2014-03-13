/**
 * UsersController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

    userlist: function (req, res){
        res.view('main/users');
    },
    
  getFriends : function (req, res) {
      var username = req.param('username'); // required parameters
      
      if(!username) {
        res.send("Username Is Required");
      } else {
           
        Users.findOneByUsername(username).done( 
            function sendListOfFriends( err, u ) {
                res.send(u.friendList);   
            }
        );
          
      }
  },
    
  addFriend : function (req, res) {
    
      var username = req.param('username');
      var newfriend = req.param('newfriend');
      
      if(!username){
        res.send("Username Is Riquired");
      }else if(!newfriend){
        res.send("New Friend Is Riquired");
      }else{
          
      
              Users.findOneByUsername(username).done( function (err, usr) {
                    
                  if(!usr){
                    res.send("Username Not Found");
                  }else{
                      var position = usr.friendList.length;
                      var haveThisFriend = false;

                      for(var i = 0; i < usr.friendList.length; i++){
                        if(usr.friendList[i] == newfriend){
                            haveThisFriend = true;
                        }
                      }

                      if(haveThisFriend){ // User already has this friend
                         res.send("User Already Has This Friend");
                      } else { 
                          usr.friendList[position] = newfriend; // add
                          usr.save(function (err) { //save changes made in the users
                            if (err) {
                                res.send("Error Save");
                            }
                          });

                          res.send("OK");
                      }
                  }
                });
                  
            }
  },
    
    getStatus : function (req, res) {
        var username = req.param('username');
        
        if(!username){
             res.send("Username Is Riquired");
        }else{
            Users.findOneByUsername(username).done( function (err, usr) {
                if(!usr){
                    res.send("User Not Found");
                }else{
                    res.send(usr.status);
                }
            });
        }
    },
    
    setStatus : function (req, res) {
        var username = req.param('username');
        var status = req.param('status');
        
        if(!username){
            res.send("Username Is Riquired");
        }else if(!status){
            res.send("Status Is Riquired");
        }else{
            Users.findOneByUsername(username).done(
                function(err, usr){
                    if(!usr){
                        res.send("User Not Found");
                    }else{
                        if(status == "online" || status == "offline"){
                            usr.status = status;
                            usr.save(function (err) { //save changes made in the users
                                if (err) {
                                    res.send("Error save");
                                }
                            }); 
                            
                            res.send("OK");
                        }else{
                            res.send("Invalid Status");
                        }
                    }
                }
            );
        }
    } 
};