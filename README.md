## Installation 
````
$ npm install brainstormedauth
````

## Usage
This is useful for Koa framework 

```js
const bsa = require('brainstormedauth')();
bsa.use(secretKey, (payload, done){
    //custom implementation for example
    try{
        userModel = await Model.findById(payload.id);
        if(!isEmpty(userModel) && user.accessTokenSalt === payload.salt){
            //This user passes into ctx.state.user
            done(null, user)
        }

        done(null, null)
    
    }
    catch(exeption){
        done(exeption, null)
    }
});

/* This method receive s argument logging, which can accept boolean value. If it is false, the the error sent to the exception is hidden. If it is true, we can see the error on console.*/
bsa.authenticate(false);

```
## Note
 This module support s only authorization header sent to Bearer token.
