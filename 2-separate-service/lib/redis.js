const redis = require('redis');
// Constants
const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PORT = process.env.REDIS_PORT || '6379';

// Variables
var redis_connected = false;

function createRedisClient() {
    return new Promise(function(resolve, reject) {
        var client = redis.createClient({
            host: REDIS_HOST,
            port: REDIS_PORT
        });
    
        client.on('connect', function() {
            console.log('Redis connected');
            resolve(client);
        });
        
        client.on("error", function (err) {
            console.log("Error " + err);
            process.exit(1);
            reject(Error("It broke"));
        });
    });
}

exports.create_session = function (key, value) {
    return new Promise(function(resolve, reject) {
        // Create Client
        createRedisClient().then(function(client) {
            return client.hmset(key, value, function(err, reply) {
                if (err) {
                    err.status = 500;
                    reject(err);
                    return;
                }

                resolve(reply);
            });
        }).catch(function(err) {
            err.status = 500;
            reject(err);
        });
    });
};

exports.get_session = function (key) {
    return new Promise(function(resolve, reject) {
        // Create Client
        createRedisClient().then(function(client) {
            return client.hgetall(key, function(err, object) {
                if (err) {
                    err.status = 500;
                    reject(err);
                    return;
                }

                resolve(object);
            });
        }).catch(function(err) {
            err.status = 500;
            reject(err);
        });
    });
};

exports.delete_session = function (key) {
    return new Promise(function(resolve, reject) {
        // Create Client
        createRedisClient().then(function(client) {
            return client.del(key, function(err, reply) {
                if (err) {
                    err.status = 500;
                    reject(err);
                    return;
                }

                resolve(reply);
            });
        }).catch(function(err) {
            err.status = 500;
            reject(err);
        });
    });
};