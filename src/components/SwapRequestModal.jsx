import {useEffect, useState} from "react";
import axiosClient from "../api/axiosClient";
import "../styles/SwapRequestModal.css";

const SwapRequestModal = ({theirEvent, onClose}) => {
    const [mySlots,
        setMySlots] = useState([]);
    const [selectedSlot,
        setSelectedSlot] = useState("");

    useEffect(() => {
        (async() => {
            try {
                const {data} = await axiosClient.get("/api/my-swappable-slots");
                setMySlots(data);
            } catch (err) {
                console.log("Error fetching my swappable slots:", err);
            }
        })();
    }, []);

    const handleSendRequest = async() => {
        if (!selectedSlot) 
            return;
        
        try {
            await axiosClient.post("/api/swap-request", {
                mySlotId: selectedSlot,
                theirSlotId: theirEvent.id
            });
            onClose(true); // refresh UI after success
        } catch (err) {
            console.log("Swap request failed:", err);
        }
    };

    return (
        <div className="swap-modal-backdrop">
            <div className="swap-modal">
                <h3>Request Swap</h3>
                <p>Offer one of your swappable slots:</p>

                <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>
                    <option value="">Select your slot</option>
                    {mySlots.map((slot) => (
                        <option key={slot.id} value={slot.id}>
                            {slot.title}
                            ({new Date(slot.startTime).toLocaleString()})
                        </option>
                    ))}
                </select>

                <div className="modal-actions">
                    <button className="send-request-btn" onClick={handleSendRequest}>
                        Send Request
                    </button>
                    <button className="close-btn" onClick={() => onClose(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SwapRequestModal;