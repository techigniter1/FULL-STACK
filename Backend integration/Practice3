1. Setup
mkdir practice3-backend
cd practice3-backend
npm init -y
npm install express mongoose body-parser


Ensure MongoDB is running locally (or use MongoDB Atlas).

2. Create server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// ---------------- MongoDB Setup ----------------
mongoose.connect('mongodb://localhost:27017/banking', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// ---------------- Account Schema ----------------
const accountSchema = new mongoose.Schema({
    accountNumber: { type: String, required: true, unique: true },
    name: String,
    balance: { type: Number, default: 0 }
});

const Account = mongoose.model('Account', accountSchema);

// ---------------- Routes ----------------

// Transfer money
app.post('/transfer', async (req, res) => {
    const { fromAccount, toAccount, amount } = req.body;

    if (!fromAccount || !toAccount || !amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid input data' });
    }

    try {
        // Find both accounts
        const sender = await Account.findOne({ accountNumber: fromAccount });
        const receiver = await Account.findOne({ accountNumber: toAccount });

        if (!sender || !receiver) {
            return res.status(404).json({ message: 'Sender or receiver account not found' });
        }

        if (sender.balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        // Sequential update
        sender.balance -= amount;
        receiver.balance += amount;

        await sender.save();
        await receiver.save();

        res.json({ message: 'Transfer successful', senderBalance: sender.balance, receiverBalance: receiver.balance });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Optional: Create sample accounts
app.post('/createAccount', async (req, res) => {
    const { accountNumber, name, balance } = req.body;
    try {
        const account = new Account({ accountNumber, name, balance });
        await account.save();
        res.json({ message: 'Account created', account });
    } catch (err) {
        res.status(500).json({ message: 'Error creating account', error: err.message });
    }
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

3. How to Test
1. Create Sample Accounts
curl -X POST http://localhost:5000/createAccount \
-H "Content-Type: application/json" \
-d '{"accountNumber":"A001","name":"Alice","balance":1000}'

curl -X POST http://localhost:5000/createAccount \
-H "Content-Type: application/json" \
-d '{"accountNumber":"B001","name":"Bob","balance":500}'

2. Successful Transfer
curl -X POST http://localhost:5000/transfer \
-H "Content-Type: application/json" \
-d '{"fromAccount":"A001","toAccount":"B001","amount":200}'


Response:

{
  "message": "Transfer successful",
  "senderBalance": 800,
  "receiverBalance": 700
}

3. Failed Transfer (Insufficient Funds)
curl -X POST http://localhost:5000/transfer \
-H "Content-Type: application/json" \
-d '{"fromAccount":"B001","toAccount":"A001","amount":1000}'


Response:

{ "message": "Insufficient funds" }

4. Failed Transfer (Missing Account)
curl -X POST http://localhost:5000/transfer \
-H "Content-Type: application/json" \
-d '{"fromAccount":"A001","toAccount":"C001","amount":50}'


Response:

{ "message": "Sender or receiver account not found" }
