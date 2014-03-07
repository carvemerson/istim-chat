/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {

        
        
        username: {
            type: 'string',
            required: true,
            unique: true
        },

        password: {
            type: 'string',
            required: true
        },

        status: {
            type: 'string',
            defaultsTo: 'offline'
        },

        friendList: {
            type: 'array'
        },

        getStatus: function() {
            return this.status;
        },
    }
    
};
