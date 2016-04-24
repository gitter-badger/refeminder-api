var notFound = function(req, res, next) {
  
  var response = { code: 404, method: req.method, message: "Sorry, but feature " +  req.url + " not found, fork it", project_url: "https://www.github.com/refeminder/refeminder-api" }

  res.status(response.code).json(response);

}

module.exports = notFound;