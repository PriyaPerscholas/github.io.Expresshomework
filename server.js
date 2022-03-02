const express = require('express');
const app = express();

const fs = require('fs')
const res = require('express/lib/response')
const req = require('express/lib/request')
app.engine('hypatia', (filePath, options, callback) => {

       fs.readFile(filePath, (err, content) => {
              if (err) return callback(err)

              const rendered = content.toString()
                     .replace('#title#', '<title>' + options.title + '</title>')
                     .replace('#message#', '<h1>' + options.message + '</h1>')
                     .replace('#content#', '<div>' + options.content + '</div>')
              return callback(null, rendered)
       })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'hypatia') // register the hypatia view engine


app.get('/greetings/:name', (req, res) => {
       res.render("template", { title: "greeting", message: "Hello", content: 'Welcome ' + req.params.name });
});

// Tell the app to listen on port 3000
// for HTTP requests from clients
app.listen(3000, function () {
       console.log('Listening on port 3000');
});