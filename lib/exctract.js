'use strict';

module.exports = (ctx) => {

    let token = null;

    if(ctx.headers.authorization && ctx.request.headers.authorization.split(' ')[0] === 'Bearer'){

        token = ctx.headers.authorization.split(' ')[1]
    }

    return token;
}
