import {useEffect, useState} from "react";
import axiosClient from "../api/axiosClient";
import "../styles/IncomingStyles.css";

const Incoming = () => {
    const [incoming,
        setIncoming] = useState([]);

    const fetchIncoming = async() => {
        try {
            const {data} = await axiosClient.get(`/api/swap-requests/incoming?t=${Date.now()}`);
            setIncoming(data);
        } catch (err) {
            console.log("Error fetching incoming requests:", err.response
                ?.data || err);
        }
    };

    useEffect(() => {
        fetchIncoming();
    }, []);
    const respond = async(requestId, accepted) => {
        try
        {
            await
            axiosClient.post(`/api/swap-response/${requestId}`, {
                accepted
            }, { // ✅ must send body
                withCredentials: true
            });

            // ✅ Refresh list after action fetchIncoming();
        } catch (err) {
            console.log("Error responding:", err.response
                ?.data || err);
        }
    };

    if (incoming.length === 0) {
        return <div style={{
            padding: "20px"
        }}>No Incoming Requests.</div>;
    }

    return (
        <div className="incoming-list">
            {incoming.map((req) => (
                <div key={req.requestId} className="request-card">
                    <div>
                        <div>
                            <strong>Requester:</strong>
                            {req.requesterName}</div>
                        <div>
                            <strong>Their Slot:</strong>
                            {req.requesterSlot}</div>
                        <div>
                            <strong>Your Slot:</strong>
                            {req.yourSlot}</div>
                    </div>

                    <div className="incoming-actions">
                        <button className="accept-btn" onClick={() => respond(req.requestId, true)}>
                            Accept
                        </button>
                        <button className="reject-btn" onClick={() => respond(req.requestId, false)}>
                            Reject
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export
default
Incoming;