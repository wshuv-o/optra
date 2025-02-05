"use client"
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaPlus, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    { id: 1, title: 'Team Meeting', date: '2023-06-15', time: '10:00 AM', category: 'work' },
    { id: 2, title: 'Birthday Party', date: '2023-06-20', time: '18:00', category: 'personal' },
    { id: 3, title: 'Project Deadline', date: '2023-06-30', time: '23:59', category: 'work' },
  ]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', category: 'work' });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 20000);
    return () => clearInterval(timer);
  }, []);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<td key={`empty-${i}`} className="h-20 cursor-pointer"></td>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const dayEvents = events.filter(event => new Date(event.date).toDateString() === date.toDateString());
      days.push(
        <td
          key={i}
          className={`relative h-20 cursor-pointer p-2 border border-stroke transition duration-500 hover:bg-gray-200 md:h-25 md:p-6 xl:h-31 ${
            dayEvents.length > 0 ? 'bg-blue-100' : ''
          }`}
          onClick={() => dayEvents.length > 0 && setSelectedEvent(dayEvents[0])}
        >
          <span className="font-medium text-black">{i}</span>
          {dayEvents.length > 0 && (
            <div className="absolute bottom-2 left-2 text-xs text-blue-600">
              <FaCalendarAlt className="inline mr-1" />
              {dayEvents.length} event{dayEvents.length > 1 ? 's' : ''}
            </div>
          )}
        </td>
      );
    }
    return days;
  };

  const renderCountdown = (eventDate: any) => {
    const now = new Date();
    const eventTime = new Date(eventDate);
    const timeDiff = eventTime - now;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return (
      <div className="text-sm text-gray-600 mt-2 animate-pulse">
        <FaClock className="inline mr-1" />
        {days}d {hours}h {minutes}m {seconds}s
      </div>
    );
  };

  const handleAddEvent = (e: any) => {
    e.preventDefault();
    const newEventWithId = { ...newEvent, id: events.length + 1 };
    setEvents([...events, newEventWithId]);
    setNewEvent({ title: '', date: '', time: '', category: 'work' });
    setShowAddEvent(false);
  };

  // Go to the previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Go to the next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="container mx-auto p-4 font-sans">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-3/4 bg-white rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 mr-2"
                onClick={goToPreviousMonth}
              >
                <FaChevronLeft />
              </button>
              <h2 className="text-2xl font-bold text-gray-800">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ml-2"
                onClick={goToNextMonth}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <table className="w-full">
              <thead>
                <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                    <th key={index} className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                      <span className="hidden lg:block">{day}</span>
                      <span className="block lg:hidden">{day.slice(0, 3)}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="grid grid-cols-7">{renderCalendarDays()}</tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full md:w-1/4 bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Upcoming Events</h3>
          {events.map(event => (
            <div
              key={event.id}
              className="p-4 rounded-lg shadow-md bg-gray-100 hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-sm">
                <FaCalendarAlt className="inline-block mr-2" />
                {event.date} at {event.time}
              </p>
              <p className="text-sm">{renderCountdown(`${event.date} ${event.time}`)}</p>
            </div>
          ))}
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center mt-4"
            onClick={() => setShowAddEvent(true)}
          >
            <FaPlus className="mr-2" /> Add Event
          </button>
        </div>
      </div>

      {selectedEvent  && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedEvent.title}</h3>
            <p className="text-gray-600 mb-2">
              <FaCalendarAlt className="inline mr-1" />
              {new Date(selectedEvent.date).toLocaleDateString()} at {selectedEvent.time}
            </p>
            {renderCountdown(`${selectedEvent.date} ${selectedEvent.time}`)}
            <div className="mt-4 flex justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                onClick={() => alert('Event added to calendar')}
              >
                Add to Calendar
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                onClick={() => setSelectedEvent(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
            <form onSubmit={handleAddEvent}>
              <div className="mb-4 space-y-2">
                <label htmlFor="title" className="block text-sm font-bold mb-2">Title</label>
                <input
                  type="text"
                  id="title"
                  className="w-full p-2 border rounded"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-bold mb-2">Date</label>
                <input
                  type="date"
                  id="date"
                  className="w-full p-2 border rounded"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="time" className="block text-sm font-bold mb-2">Time</label>
                <input
                  type="time"
                  id="time"
                  className="w-full p-2 border rounded"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-bold mb-2">Category</label>
                <select
                  id="category"
                  className="w-full p-2 border rounded"
                  value={newEvent.category}
                  onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                >
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                  onClick={() => setShowAddEvent(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
