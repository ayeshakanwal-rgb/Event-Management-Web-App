// Predefined events array
let events = [
    {name: "Music Concert", date: "2026-02-15", desc: "A live music event."},
    {name: "Art Workshop", date: "2026-03-10", desc: "Learn painting and drawing."},
    {name: "Tech Conference", date: "2026-01-05", desc: "Conference about latest tech."}
];

// DOM Elements
const eventList = document.getElementById("event-list");
const eventForm = document.getElementById("event-form");
const warning = document.getElementById("warning");
const searchInput = document.getElementById("search");

// Display Events Function
function displayEvents(filteredEvents = events) {
    // Sort events by date ascending
    filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    eventList.innerHTML = ""; // Clear previous events

    filteredEvents.forEach((event, index) => {
        const card = document.createElement("div");
        card.className = "event-card";

        // Highlight past events
        if (new Date(event.date) < new Date()) {
            card.classList.add("past");
        }

        card.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p>${event.desc}</p>
            <button onclick="deleteEvent(${index})">Delete</button>
        `;
        eventList.appendChild(card);
    });
}

// Delete Event
function deleteEvent(index) {
    events.splice(index, 1);
    displayEvents();
}

// Add Event
eventForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("event-name").value.trim();
    const date = document.getElementById("event-date").value;
    const desc = document.getElementById("event-desc").value.trim();

    if (!name || !date || !desc) {
        warning.textContent = "All fields are required!";
        return;
    }

    warning.textContent = ""; // Clear warning
    events.push({name, date, desc});
    displayEvents();

    eventForm.reset();
});

// Search Functionality
searchInput.addEventListener("input", function() {
    const query = searchInput.value.toLowerCase();
    const filtered = events.filter(event => 
        event.name.toLowerCase().includes(query) || event.date.includes(query)
    );
    displayEvents(filtered);
});

// Initial Display
displayEvents();
