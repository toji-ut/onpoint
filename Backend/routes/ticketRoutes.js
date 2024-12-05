const express = require('express');
const { getTickets, createTicket, updateTicket } = require('../controllers/ticketController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getTickets);
router.post('/', authMiddleware, createTicket);
router.put('/:id', authMiddleware, updateTicket);

module.exports = router;
