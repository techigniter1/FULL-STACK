// app.js
const express = require('express');
const path = require('path');

const router = express();
const LOCK_DURATION_MS = 60 * 1000; // 1 minute

// In-memory seat storage
const seats = new Map();
const INITIAL_SEAT_COUNT = 10;
for (let i = 1; i <= INITIAL_SEAT_COUNT; i++) {
  seats.set(String(i), {
    id: String(i),
    status: 'available',
    lockExpiry: null,
    lockTimer: null,
  });
}

// Helper to release lock
function releaseLock(seat) {
  if (!seat) return;
  if (seat.lockTimer) {
    clearTimeout(seat.lockTimer);
    seat.lockTimer = null;
  }
  seat.status = 'available';
  seat.lockExpiry = null;
}

// Serve frontend
router.use(express.static(path.join(__dirname)));

// GET /seats
router.get('/seats', (req, res) => {
  const out = {};
  for (const [id, seat] of seats.entries()) {
    if (seat.status === 'locked' && seat.lockExpiry && Date.now() > seat.lockExpiry) {
      releaseLock(seat);
    }
    out[id] = { status: seat.status };
  }
  res.json(out);
});

// POST /lock/:id
router.post('/lock/:id', (req, res) => {
  const id = req.params.id;
  const seat = seats.get(id);
  if (!seat) return res.status(404).json({ message: `Seat ${id} does not exist` });

  if (seat.status === 'locked' && seat.lockExpiry && Date.now() > seat.lockExpiry) {
    releaseLock(seat);
  }

  if (seat.status === 'booked') return res.status(400).json({ message: `Seat ${id} is already booked` });
  if (seat.status === 'locked') return res.status(400).json({ message: `Seat ${id} is already locked` });

  seat.status = 'locked';
  seat.lockExpiry = Date.now() + LOCK_DURATION_MS;
  if (seat.lockTimer) clearTimeout(seat.lockTimer);
  seat.lockTimer = setTimeout(() => {
    if (seat.status === 'locked') {
      releaseLock(seat);
      console.log(`Lock expired: Seat ${id} released`);
    }
  }, LOCK_DURATION_MS);

  res.json({ message: `Seat ${id} locked successfully. Confirm within 1 minute.` });
});

// POST /confirm/:id
router.post('/confirm/:id', (req, res) => {
  const id = req.params.id;
  const seat = seats.get(id);
  if (!seat) return res.status(404).json({ message: `Seat ${id} does not exist` });

  if (seat.status === 'locked' && seat.lockExpiry && Date.now() > seat.lockExpiry) {
    releaseLock(seat);
  }

  if (seat.status !== 'locked') return res.status(400).json({ message: 'Seat is not locked and cannot be booked' });

  if (seat.lockTimer) {
    clearTimeout(seat.lockTimer);
    seat.lockTimer = null;
  }
  seat.lockExpiry = null;
  seat.status = 'booked';

  res.json({ message: `Seat ${id} booked successfully!` });
});

module.exports = router;
