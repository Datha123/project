const admin = require('firebase-admin');
const serviceAccount = require('./key.json'); // Replace with the correct path to your key.json file

// Check if the app is already initialized
if (!admin.apps.length) {
    // Initialize Firebase with your configuration
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // Replace with your Firestore configuration
    });
}

// Function to store user data in Firestore
async function storeUserData(name, email, password) {
    try {
        const db = admin.firestore();
        const usersRef = db.collection('users');

        // Create a new user document
        await usersRef.add({
            name: name,
            email: email,
            password: password,
        });

        console.log('User data stored successfully in Firestore.');

        // You can add redirection logic here if needed
    } catch (error) {
        console.error('Error storing user data:', error);
        // Handle the error appropriately (e.g., show an error message to the user)
    }
}

module.exports = {
    storeUserData,
};