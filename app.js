const express = require('express');
const app = express();

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

app.get('/', function (req, res) { res.send('Welcome!'+'<script type="text/javascript">var utag_data = {location:"tokyo"}</script><script type="text/javascript">(function(a,b,c,d){a=\'//tags.tiqcdn.com/utag/drights/main/prod/utag.js\';b=document;c=\'script\';d=b.createElement(c);d.src=a;d.type=\'text/java\'+c;d.async=true;a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);})();</script>');});
app.get('/tweets/:lat/:long', require('./controllers/twitterController'));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(app.get('port'), app.get('ip'), function () {
    console.log( "Globe api on " + app.get('ip') + ", server_port " + app.get('port')  );
});
