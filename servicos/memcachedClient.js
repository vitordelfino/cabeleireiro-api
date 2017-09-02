var memjs = require('memjs');

module.exports = function(){
    return createMemcachedClient;
}

function createMemcachedClient(){

    if(process.env.NODE_ENV == 'production')
        return memjs.Client.create(process.env.MEMCACHEDCLOUD_SERVERS, {
            username: process.env.MEMCACHEDCLOUD_USERNAME,
            password: process.env.MEMCACHEDCLOUD_PASSWORD
        });

    return memjs.Client.create('localhost:11211');
}
