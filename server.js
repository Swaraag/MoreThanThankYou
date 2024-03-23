// command to open aws rds mysql db hhhhf........≥...in terminal: mysql -h more-than-thank-you-v1.cjc080s2o7gm.us-east-1.rds.amazonaws.com -u admin -p
// password: BkGoqRM6XRLzoey4LIAq
const express = require('express');
const mysql = require('mysql');
const path = require('path')

const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname)));

const db = mysql.createConnection({
  host: 'more-than-thank-you-v1.cjc080s2o7gm.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'BkGoqRM6XRLzoey4LIAq',
  database: 'mtty'
});

db.connect(function(err) {
    if (err) {
      throw err;
    }
    console.log('Connected to database.');
  });
  
app.get('/getUsers', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

app.use(express.json());

app.post('/addUser', (req, res) => {
  const { username, email } = req.body;
  const sql = 'INSERT INTO users (username, email) VALUES (?, ?);';
  db.query(sql, [username, email], (err, result) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.status(201).json({ message: 'User added successfully' });
      }
  });
});

app.post('/addStory', (req, res) => {
  // const { actionName, actionDesc } = req.body;
  // const sql = 'INSERT INTO stories (actionName, actionDesc) VALUES (?, ?);';
  // db.query(sql, [actionName, actionDesc], (err, result) => {
  //     if (err) {
  //         res.status(500).json({ error: err.message });
  //     } else {
  //         res.status(201).json({ message: 'User added successfully' });
  //     }
  // });
  const { email, recEmail, actionName, actionDesc, locationLat, locationLon} = req.body;
  const sql = 'INSERT INTO stories (email, recEmail, actionName, actionDesc, locationLat, locationLon) VALUES (?, ?, ?, ?, ?, ?);';
  db.query(sql, [email, recEmail, actionName, actionDesc, locationLat, locationLon], (err, result) => {
      if (err) {
          res.status(500).json({ error: err.message});
      } else {
          res.status(201).json({ message: 'Story added successfully' });
      }
  });
});
  

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});