'use strict';

const { verify } = require('brainstormedtoken');
const extract = require('./lib/exctract');


//as brainstormed auth
class BSA {
    constructor(){
        this._payload = null;
        this._message = null;
        this.logging = false;
    }


    get message() {
        return this._message;
    }
    set message(message) {
        this._message = message;
    }

    get payload(){
        return this._payload
    }
    set payload(payload){
        this._payload = payload;
    }

    
    get user(){
        return this._user
    }
    set user(user){
        this._user = user
    } 

    use(secret, callback){
        this._secret = secret;
        this._callback = callback
        this._done = async (err, data)=>{
            if(err  && !data){
                this.message = err
            }
            if(!err && data){ 
                this.message = data
                this.user = data

            }
            if(!err && !data){
                this.message = null
            }
        }

    }

    authenticate(logging = false){
        
        this.logging = logging;

        return async (ctx, next) => {
            
            this.verify(ctx,this._secret);
            if(this.payload === false){
                this.fail(ctx);
                return 
            }

            if(this.payload === null){
                return  this.fail(ctx, next)
            }
            this._callback(this.payload.payload, this._done);
            if(this.message instanceof Error){
                if(typeof logging !== 'boolean'){
                    throw new TypeError('param "logging" must be true or false ` default false');  
                }else this.logging = logging;
                if(this.logging === true) {
                    this.fail(ctx);
                    return
                                         
                }
                return  this.fail(ctx); 
                
            }
    
            if(this.message === null){
                this.fail(ctx);
                return
            }
            
            this.success(ctx);
           return  await next()
        }
    }

    fail(ctx){
        ctx.status = 401;
    }

    success(ctx){
        ctx.state.user = this.user;
    }

    verify(ctx, secret){
        let token = extract(ctx);
        if(!token){
           return  this.fail(ctx)
        }
        this.payload = verify(token, secret);
    }
};

module.exports = BSA;
