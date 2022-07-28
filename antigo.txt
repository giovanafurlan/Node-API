const express = require('express'); //importacao do pacote
const app = express(); //instanciando express
const cors = require('cors');
const bodyParser = require('body-parser'); // middleware

app.use(bodyParser.urlencoded({ extended: false }));

// Route to Login Page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.post('/login', (req, res) => {
  // Insert Login Code Here
  let username = req.body.username;
  let password = req.body.password;
  let code = req.body.code;
  res.send(`Username: ${username} Password: ${password} Code: ${code}`);
});

app.use(cors()); //habilitando cors na nossa aplicacao

app.listen(3000); //execucao do servidor