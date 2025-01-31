const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(bodyParser.json());
let Transcations = [];

//adding normal transaction
app.post("/add transaction", (req, res) => {
    try {
        const {amount, date,description} = req.body;
         if (!amount || !date || !description) {
            res.json({error: 'Amount, Date and Description are required'});
            }
            const transaction = {
                id : Transactions + 1,
                amount,
                date,
                time,
                description
            };
        Transactions.push(transaction);
        res.json(transaction);
        console.log('Transaction added successfully:', transaction);
        }
    catch (error) {
        res.status(500).json({error: "Error adding transaction"});
    }
});


//getting all treansactions
app.get('/transactions', (req, res) => {
    try {
        res.json(Transactions);
        
    } catch (error) {
        res.status(500).json({error: "Error send proper Transaction"});
    }
});

//getting recent transactions
app.get("/recent transactions", (req, res) => {
    try {
        const recenttransactions = [];
        
    } catch (error) {
        res.status(500).json({error: "Error getting recent transactions"});
    }
});

//geting transaction by sms text
app.post("/parse-sms", (req, res) => {
    const {sms} = req.body;
    const match = rex.exec(sms);
    const rex = /(?<date>\d{2}\/\d{2}\/\d{4})\s+(?<time>\d{2}:\d{2})\s+(?<description>.*)\s+INR\s+(?<amount>[\d,\.]+)/;
    if (!sms) {
        res.json({ error: 'sms text is required...' });
    }
    if (match)
    { 
        const match = [,amount, date,description] = rex.exec(sms);
        const transaction = {
            amount: parseFloat(amount.replace(/,/g, '')),
            date: date,
            time : time,
            description: description,
            id : Transactions + 1
        };
        res.json(transaction);
        Transactions.push(transaction);
        console.log('Transaction added successfully from thr sms : ', transaction);
     }
     else {
        res.json({error: "Invalid SMS"});
     }
});

app.listen(5000, () => {
    console.log(`Server is running on port ${5000}`);
});