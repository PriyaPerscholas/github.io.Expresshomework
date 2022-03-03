const express = require('express');
const req = require('express/lib/request');
const app = express();

app.get('/', (req, res) => {
       res.send(

              `<h1>99 bottles of beer on the wall</h1>
                     <a href='/98'> take one down and pass it around </a >`

       )
})

app.get('/:numberofbottles', (req, res) => {
       if (req.params.numberofbottles > 0) {
              res.send(
                     `<h1>${req.params.numberofbottles} Bottles of Gatronde on the wall</h1>
              <a href=${req.params.numberofbottles - 1}>take one down and pass it around</a>`
              )
       }
       else {
              res.send("1 bottle of beer on the wall <a href='/'>Start Over</a>");
       }
})

app.listen(3000, function () {
       console.log('Listening on port 3000');
});