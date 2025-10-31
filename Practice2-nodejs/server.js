const express = require('express');
const app = express();
app.use(express.json());

let cards = [
    { id: 1, suit: "Hearts", value: "Ace" },
    { id: 2, suit: "Spades", value: "King" },
    { id: 3, suit: "Diamonds", value: "Queen" }
];

// GET /cards - List all cards
app.get('/cards', (req, res) => {
    res.status(200).json(cards);
});

// GET /cards/:id - Retrieve a card by ID
app.get('/cards/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const card = cards.find(c => c.id === id);
    if (card) {
        res.status(200).json(card);
    } else {
        res.status(404).json({ error: "Card not found" });
    }
});

// POST /cards - Add a new card
app.post('/cards', (req, res) => {
    const { suit, value } = req.body;
    const newId = cards.length ? Math.max(...cards.map(c => c.id)) + 1 : 1;
    const newCard = { id: newId, suit, value };
    cards.push(newCard);
    res.status(201).json(newCard);
});

// DELETE /cards/:id - Remove a card by ID
app.delete('/cards/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = cards.findIndex(c => c.id === id);
    if (index !== -1) {
        const removed = cards.splice(index, 1)[0];
        res.status(200).json(removed);
    } else {
        res.status(404).json({ error: "Card not found" });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
