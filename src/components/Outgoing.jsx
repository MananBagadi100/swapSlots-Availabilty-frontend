import {useEffect, useState} from "react";
import axiosClient from "../api/axiosClient";
import "../styles/OutgoingStyles.css";

const Outgoing = () => {
    const [outgoing,
        setOutgoing] = useState([]);

    useEffect(() => {
        (async() => {
            try {
                const {data} = await axiosClient.get("/api/swap-requests/outgoing");
                setOutgoing(data);
            } catch (err) {
                console.log("Error fetching outgoing requests:", err);
            }
        })();
    }, []);

    if (outgoing.length === 0) 
        return <div className="req-empty">No outgoing requests.</div>;
    
    return (
        <div className="outgoing-container">
            {outgoing.map((req) => (
                <div key={req.requestId} className="request-card">
                    <div>
                        You requested swap with
                        <strong>{req.responderName}</strong>
                        <br/>Your Slot:
                        <em>{req.mySlot}</em>
                        <br/>Their Slot:
                        <em>{req.theirSlot}</em>
                    </div>

                    <div className="status-badge">{req.status}</div>
                </div>
            ))}
        </div>
    );
};

export default Outgoing;