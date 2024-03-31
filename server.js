// command to open aws rds mysql db hhhhf........≥...in terminal: mysql -h more-than-thank-you-v1.cjc080s2o7gm.us-east-1.rds.amazonaws.com -u admin -p
// password: BkGoqRM6XRLzoey4LIAq

// key pair for EC2 instance: moreThanThankYouProj
const express = require('express');
const session = require('express-session')
const bcrypt = require('bcrypt')
const mysql = require('mysql');
const path = require('path')

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'yYLjk6U6XwVIunNL1DNvi9ePqlwpqCvV', // <-- Secret key
    resave: false,
    saveUninitialized: false
}));


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

app.get('/getStories', (req, res) => {
    const sql = 'SELECT * FROM stories';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

app.post('/registerUser', async (req, res) => {
  const { username, email, password } = req.body;

  const salt = await bcrypt.genSalt(10)
  const hashedPw = await bcrypt.hash(password, salt)

  const insertSQL = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?);';
  db.query(insertSQL, [username, email, hashedPw], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      }
      const selectSQL = 'SELECT * FROM users WHERE id = ?';
      db.query(selectSQL, result.insertId, (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } 
        req.session.user = rows[0];
        res.status(201).json({ message: 'User added successfully' });
    });
  });
});



app.post('/loginUser', (req, res) => {
    const { userEmail, userPW } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?'
    db.query(sql, userEmail, async (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message })
        }
        if (results.length === 0) {
            res.status(404).send("No users found with that email.")
            return;
        }
        if (results.length > 1) {
            res.status(500).send("ERRORRRRR")
        }

        //const pwMatch = await bcrypt.compare(results[0].password)
        bcrypt.compare(userPW, results[0].password, function(err, result) {
            if (result) {   
                req.session.user = results[0];
                console.log(req.session.user)
                res.status(201).json({ message: "User logged in."})
            }
            else {
                res.status(404).json({ message: "Incorrect password. "})
            }
        });
    })
})

app.post('/addStory', (req, res) => {

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

app.get('/getStoriesCSV', (req, res) => {
    const fs = require('fs')
    var csvString = fs.readFileSync('static/storiesFormData.tsv', 'utf8')

    csvString = csvString.split('\r\n').map(row => {
    return row.split('\t')
})
    //const csvArray = parseToArray(csvString)
    res.json(csvString)
  
})

app.get('/checkSession', (req, res) => {

    console.log(req.session.user)
    if (req.session.user) {
        console.log(req.session.user.username)
        res.status(201).json({ message: req.session.user.username })
    }
    else {
        res.status(404).json({ message: "Anonymous user" })
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
