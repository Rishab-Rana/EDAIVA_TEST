

module.exports=function(app) {
//All the routes are handled here
app.use('/',require('../routes/greeting'));
app.use("/user",require("../routes/user.routes"));

}