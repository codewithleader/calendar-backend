const { response } = require('express');
const Event = require('../models/Event');

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);
  try {
    /* Adding the user id to the event before save. */
    event.user = req.uid;
    console.log(event);

    /* Saving the event to the database. */
    const saveEvent = await event.save();
    res.json({
      ok: true,
      msg: 'Create event',
      event: saveEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'An error here! Please contact the administrator',
    });
  }
};

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate('user', 'name email'); // Populate the user id

  res.json({
    ok: true,
    events,
  });
};

const updateEvent = async (req, res = response) => {
  const eventID = req.params.id;
  const userID = req.uid;

  try {
    const event = await Event.findById(eventID);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Event not found',
      });
    }
    if (event.user.toString() !== userID) {
      return res.status(401).json({
        ok: false,
        msg: `You can't update this event. It's not yours.`,
      });
    }
    const newEvent = {
      ...req.body,
      user: userID, // but its not necessary because in the old event exist userID.
    };

    const updateEvent = await Event.findByIdAndUpdate(eventID, newEvent, { new: true });
    res.json({
      ok: true,
      msg: 'Update event',
      event: updateEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'An error here! Please contact the administrator',
    });
  }
};

const deleteEvents = async (req, res = response) => {
  const eventID = req.params.id;
  const userID = req.uid;

  try {
    const event = await Event.findById(eventID);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Event not found',
      });
    }
    if (event.user.toString() !== userID) {
      return res.status(401).json({
        ok: false,
        msg: `You can't delete this event. It's not yours.`,
      });
    }

    await Event.findByIdAndDelete(eventID);
    res.json({
      ok: true,
      msg: 'Event deleted',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'An error here! Please contact the administrator',
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvents,
};
