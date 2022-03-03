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
       res.render("template", { title: "greeting", message: "Hello", content: 'Welcome ' + req.params.name + 'Nice to see you' });
});

app.get('/tip/:total/:tipPercentage', (req, res) => {
       res.render("template", {
              title: "tip", message: "Your tip is", content: Math.round((req.params.total * (req.params.tipPercentage / 100)) * 100) / 100
       })

});

let ar = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely", "You may rely on it", "As I see it yes", "Most likely", "Outlook good", "Yes", "Signs point to yes", "Reply hazy try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"]

function random() {
       return Math.floor(Math.random() * (20));
}
app.get('/magic/:question', (req, res) => {
       res.render("template", { title: "Magic ball", message: req.params.question, content: ar[random()] })
       //res.send(req.params.question + ar[random()]);
});





// Tell the app to listen on port 3000
// for HTTP requests from clients

app.listen(3000, function () {
       console.log('Listening on port 3000');
});