const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Firebase Admin SDK for Firestore
const admin = require('firebase-admin');
const serviceAccount = require('./key.json'); // Replace with the correct path to your service account key JSON file

// Check if the app is already initialized
if (!admin.apps.length) {
    // Initialize Firebase with your configuration
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-bcl88%40web-app-c3a14.iam.gserviceaccount.com' // Replace with your Firestore database URL
    });
}

// Set up Firestore
const db = admin.firestore();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static('public'));

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Define routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/signin', (req, res) => {
    // Pass an empty error message to the sign-in page
    res.render('signin', { errorMessage: '' });
});

app.post('/signup', async (req, res) => {
    const { name, email, password, terms } = req.body;

    try {
        // Store user data in Firestore
        const usersRef = db.collection('users');
        await usersRef.add({ name, email, password });

        // Redirect to the weather page after successful signup
        res.redirect('/weather');
    } catch (error) {
        console.error('Error storing user data:', error);
        res.status(500).send('Error storing user data');
    }
});

app.post('/signin', (req, res) => {
    const { email, password } = req.body;

    // Replace this with Firestore query to find user by email and verify password
    const usersRef = db.collection('users');
    usersRef
        .where('email', '==', email)
        .where('password', '==', password)
        .get()
        .then((snapshot) => {
            if (snapshot.empty) {
                // Authentication failed, redirect back to the sign-in page with an error message
                res.render('signin', { errorMessage: 'Invalid email or password.' });
            } else {
                // Authentication successful, redirect to the weather page
                res.redirect('/weather');
            }
        })
        .catch((error) => {
            console.error('Error finding user:', error);
            res.status(500).send('Error finding user');
        });
});

// Define a route for the weather page
app.get('/weather', (req, res) => {
    res.render('weather');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
