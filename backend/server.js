const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 5001;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://sanjaynarasimman340:Sridhar%402006@cluster0.loeel.mongodb.net/expense?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



// mongo Schema
const transactionSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }
});

//user schema
const userSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
      },
      fullName: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
        minlength: 6,
      },
    },
    { timestamps: true }
  );

const Transaction = mongoose.model('Transaction', transactionSchema);
const User = mongoose.model('User', userSchema);

app.post("/addtransaction", async (req, res) => {
    try {
        const {amount, date, description, category, time} = req.body;
        if (!amount || !date || !description || !category || !time) {
            return res.status(400).json({error: 'Amount, Date, category, time and Description are required'});
        }
        const transaction = new Transaction({
            amount,
            date,
            time,
            description,
            category
        });
        await transaction.save();
        res.json(transaction);
    } catch (error) {
        res.status(500).json({error: "Error adding transaction"});
    }
});

//reports for transcaritions
app.post("/reports", async (req, res) => {
    try {
        const transactions = await Transaction.find();
        const summary = {
            totalTransactions: transactions.length,
            totalAmount: transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
        };
        res.json(summary);
    } catch (error) {
        res.status(500).json({ error: "Error generating report" });
    }
});

// Getting all transactions
app.get('/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({error: "Error getting transactions"});
    }
});


//delete transaction
app.post("/deletetransaction/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Transaction.findByIdAndDelete(id);
        res.json({ message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting transaction" });
    }
});

// Getting recent transactions
app.get("/recenttransactions", async (req, res) => {
    try {
        const recentTransactions = await Transaction.find()
            .sort({ _id: -1 })
            res.json(recentTransactions);
    } catch (error) {
        res.status(500).json({error: "Error getting recent transactions"});
    }
});

// for SMS 
app.post("/parse-sms", async (req, res) => {
    try {
        const {sms} = req.body;
        if (!sms) {
            return res.status(400).json({ error: 'SMS text is required...' });
        }

        const rex = /(?<date>\d{2}\/\d{2}\/\d{4})\s+(?<time>\d{2}:\d{2})\s+(?<description>.*)\s+INR\s+(?<amount>[\d,\.]+)/;
        const match = rex.exec(sms);

        if (match) {
            const { amount, date, time, description } = match.groups;
            const transaction = new Transaction({
                amount: parseFloat(amount.replace(/,/g, '')),
                date,
                time,
                description,
                category: 'SMS' 
            });
            await transaction.save();
            res.json(transaction);
        } else {
            res.status(400).json({error: "Invalid SMS format"});
        }
    } catch (error) {
        res.status(500).json({error: "Error processing SMS"});
    }
});

//signup
app.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName && !email && !password) {
            return res.status(400).json({ message: "All Fields are Required!" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password Must Contain Atleast 6 Characters! " });
        }
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User Already Exist" });
        const newUser = new User({
            fullName,
            email,
            password
        });
    } catch (error) {
        console.log("Error in signup Controller", error.message);
        res.status(500).json({ message: "Internal Server Error " });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials! " });
        }

        const isPasswordCorrect = await (password === user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials! " });
        }

        res.status(200).json({ _id: user._id, fullName: user.fullName, email: user.email, profilePic: user.profilePic });

    } catch (error) {
        console.log("Error in Login Controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${5000}`);
});