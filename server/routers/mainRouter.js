const express = require('express')
const { getLogin, registerUser, logout, setLogin } = require('../controllers/mainController')
const { createEvent, getEvents, readEvent } = require('../controllers/eventsController')
const router = express.Router()
const {partyGetVenues, partyInsert,partyGetBookings} = require('../controllers/partyController')
const { getPendingUsers, getPendingUsersById } = require('../controllers/adminController')

router.route('/register').post(registerUser)
router.route('/login').post(setLogin).get(getLogin)
router.route('/logout').get(logout)
//router.route('/')
router.route('/admin/pendingusers').get(getPendingUsers)
router.route('/admin/events').get(getEvents)
router.route('/admin/events/create').post(createEvent)
router.route('/admin/events/details/:id').get(readEvent)
router.route('/admin/pendingusers/details/:id').get(getPendingUsersById)

router.route('/user/partyGetVenues').get(partyGetVenues)
router.route('/user/partyInsert').post(partyInsert)
router.route('/user/partyGetBookings').get(partyGetBookings)




module.exports = router