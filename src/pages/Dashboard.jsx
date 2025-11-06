import {useContext, useEffect, useState} from "react";
import axiosClient from "../api/axiosClient";
import "../styles/DashboardStyles.css";
import {AuthContext} from "../context/AuthContext";
import {Link} from "react-router-dom";

const Dashboard = () => {
    const {loginState} = useContext(AuthContext);
    const [events,
        setEvents] = useState([]);
    const [showAddModal,
        setShowAddModal] = useState(false);
    const [form,
        setForm] = useState({title: "", startTime: "", endTime: ""});

    useEffect(() => {
        if (loginState) 
            fetchMyEvents();
        }
    , [loginState]);

    async function fetchMyEvents() {
        const response = await axiosClient.get("/api/events/my");
        setEvents(response.data);
    }

    async function submitNewEvent(e) {
        e.preventDefault();
        await axiosClient.post("/api/events", form);
        setShowAddModal(false);
        setForm({title: "", startTime: "", endTime: ""});
        fetchMyEvents();
    }

    // your previous toggle + delete functions stay the same

    if (!loginState) {
        return (
            <div className="dashboard-main-div">
                <div className="dashboard-msg">Please Login to view dashboard</div>
                <Link className="dashboard-login-redirect-btn" to="/login">Proceed to Login</Link>
            </div>
        );
    }
    async function deleteEvent(id) {
        const ok = window.confirm("Delete this event?");
        if (!ok) 
            return;
        try {
            await axiosClient.delete(`/api/events/${id}`);
            setEvents(prev => prev.filter(e => e.id !== id));
        } catch (err) {
            console.log("Delete failed:", err);
            alert(err.response
                ?.data
                    ?.message || "Could not delete");
        }
    }
    const handleToggleStatus = async(event) => {
        try {
            const newStatus = event.status === "SWAPPABLE"
                ? "BUSY"
                : "SWAPPABLE";

            await axiosClient.patch(`/api/events/${event.id}/status`, {status: newStatus});

            setEvents((prev) => prev.map((e) => e.id === event.id
                ? {
                    ...e,
                    status: newStatus
                }
                : e));
        } catch (err) {
            console.log("Error toggling status:", err);
        }
    };
    return (
        <div className="dashboard-container">
            <h2 className="dashboard-heading">Your Events</h2>

            <button className="add-event-btn" onClick={() => setShowAddModal(true)}>
                + Add Event
            </button>

            {events.length === 0
                ? (
                    <div className="dashboard-empty">No Events Found</div>
                )
                : (
                    <div className="events-list">
                        {events.map((event) => (
                            <li key={event.id} className="event-card">
                                <span className="event-title">{event.title}</span>

                                <span>
                                    {new Date(event.startTime).toLocaleString()}
                                    → {new Date(event.endTime).toLocaleString()}
                                </span>

                                <span
                                    className={`event-status ${event
                                    .status
                                    .toLowerCase()}`}>
                                    Status: {event.status}
                                </span>

                                {/* ✅ Toggle Only If Not Swap Pending */}
                                <button
                                    className="toggle-btn"
                                    disabled={event.status === "SWAP_PENDING"}
                                    onClick={() => handleToggleStatus(event)}>
                                    {event.status === "SWAPPABLE"
                                        ? "Set Busy"
                                        : "Set Swappable"}
                                </button>

                                {/* Delete Button */}
                                <button className="delete-btn" onClick={() => handleDelete(event.id)}>
                                    Delete
                                </button>
                            </li>

                        ))}
                    </div>
                )}

            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>Add Event</h3>
                        <form onSubmit={submitNewEvent}>
                            <input
                                type="text"
                                placeholder="Title"
                                value={form.title}
                                onChange={(e) => setForm({
                                ...form,
                                title: e.target.value
                            })}
                                required/>

                            <input
                                type="datetime-local"
                                value={form.startTime}
                                onChange={(e) => setForm({
                                ...form,
                                startTime: e.target.value
                            })}
                                required/>

                            <input
                                type="datetime-local"
                                value={form.endTime}
                                onChange={(e) => setForm({
                                ...form,
                                endTime: e.target.value
                            })}
                                required/>

                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setShowAddModal(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;