var redisClient = require('./redis_database').redisClient;
var TOKEN_EXPIRATION = 60;
var TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION * 60;

// Middleware for token verification
exports.verifyToken = function (req, res, next) {
	redisClient.get(req.user.id, function (err, reply) {
		if (err) {
			console.log(err);
			return res.send(500);
		}

		if (!reply) {

			res.send(401);
		}

		else {
			var incomingToken = getToken(req.headers)
			if (incomingToken != reply){
				res.send(401);
			}
			else {
				next();
			}
		}

	});
};

exports.getToken = function(userid, next){
	redisClient.get(userid, function (err, reply){
		if (err){
			console.log(err);
			return res.send(500);
		}

		next(reply);
	});
};

exports.stashToken = function(userid, token){
	redisClient.set(userid, token);
};

exports.expireToken = function(headers) {
	redisClient.set(header.user.id, { is_expired: true });
   	redisClient.expire(header.user.id, 0);
};

var getToken = function(headers) {
	if (headers && headers.authorization) {
		var authorization = headers.authorization;
		var part = authorization.split(' ');

		if (part.length == 2) {
			var token = part[1];

			return part[1];
		}
		else {
			return null;
		}
	}
	else {
		return null;
	}
};

exports.TOKEN_EXPIRATION = TOKEN_EXPIRATION;
exports.TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION_SEC;