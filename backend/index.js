


const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginModel = require('./model/logindata');
const adminModel = require('./model/adminlogindata');
const EventData = require('./model/eventdetails'); // Adjust the path if necessary
const Registration = require('./model/userregistration');
const app = express();
const PORT = 4000;
const SECRET_KEY = 'your_very_strong_and_random_secret_key'; 
const Booking = require('./model/Booking');
app.use(cors());
app.use(express.json());


// Signup route
app.post('/signup', async (req, res) => {
    const { email, password, name, phoneNo, city } = req.body;

    try {
        const existingUser = await loginModel.findOne({ username: email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new loginModel({
            username: email,
            password: hashedPassword,
            name,
            phoneNo,
            city
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Fetch users
app.get('/users', async (req, res) => {
    try {
        const users = await loginModel.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete user
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await loginModel.findByIdAndDelete(id);
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await loginModel.findOne({ username: email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
                const { password, ...userData } = user._doc;
                res.status(200).json({ token, user: userData, message: 'Login successful' });
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Admin login route
app.post('/admin/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await adminModel.findOne({ username: email });
        if (admin) {
            if (admin.password === password) {
                const token = jwt.sign({ id: admin._id }, SECRET_KEY, { expiresIn: '1h' });
                res.status(200).json({ token, message: 'Login successful' });
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


// Fetch all events
app.get('/api/events', async (req, res) => {
    try {
        const events = await EventData.find({});
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching events', error: error.message });
    }
});

// Fetch a single event
app.get('/api/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const event = await EventData.findById(id);
        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete an event
app.delete('/api/events/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const result = await EventData.findByIdAndDelete(eventId);
        if (result) {
            res.status(200).json({ message: 'Event deleted successfully' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error deleting event', error: error.message });
    }
});

// Add a new event
app.post('/api/events', async (req, res) => {
    try {
        const newEvent = new EventData(req.body);
        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error creating event', error: error.message });
    }
});

// Update an event
app.put('/api/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEvent = await EventData.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedEvent) {
            res.status(200).json(updatedEvent);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error updating event', error: error.message });
    }
});
// Fetch all events that haven't ended yet
app.get('/api/events', async (req, res) => {
    try {
      const now = new Date();
      const events = await Event.find({ date: { $gte: now } }); // Find events with date >= now
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  });
  //Fetch events that have ended
app.get('/api/events/ended', async (req, res) => {
  try {
    const now = new Date();
    const endedEvents = await Event.find({ date: { $lt: now } }); // Find events with date < now
    res.json(endedEvents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ended events' });
  }
});

app.get('/profile/:username', async (req, res) => {
    try {
        const user = await loginModel.findOne({ username: req.params.username });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Update profile data
app.put('/profile/:username', async (req, res) => {
    try {
        const { name, phoneNo, city, dp } = req.body;

        const updatedUser = await loginModel.findOneAndUpdate(
            { username: req.params.username },
            { name, phoneNo, city, dp },
            { new: true } // This option ensures that the updated user data is returned
        );

        if (updatedUser) {
            res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Fetch registered events for a user
app.get('/user-registrations/:username', async (req, res) => {
    try {
        // Find the user by username
        const user = await loginModel.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find registrations for the user's ID
        const registrations = await Registration.find({ userId: user._id }).populate('eventId');

        // Map registrations to the required format
        const events = registrations.map(registration => ({
            event: registration.eventId,
            numberOfTickets: registration.numberOfTickets
        }));

        // Send the response
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching registrations', error: error.message });
    }
});

// Book tickets

app.post('/api/bookings', async (req, res) => {
    try {
      const { username, bookingid, eventid, no_of_tickets } = req.body;
  
      // Validate that all fields are present
      if (!username || !bookingid || !eventid || !no_of_tickets) {
        return res.status(400).send({ message: 'Missing required fields.' });
      }
  
      // Validate number of tickets
      if (no_of_tickets < 1) {
        return res.status(400).send({ message: 'Number of tickets must be at least 1.' });
      }
  
      // Create a new booking instance
      const newBooking = new Booking({
        username,
        bookingid,
        eventid,
        no_of_tickets,
      });
  
      // Save the booking to the database
      await newBooking.save();
  
      res.send({ message: 'Booking successful' });
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).send({ message: 'Server error during booking' });
    }
  });
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
