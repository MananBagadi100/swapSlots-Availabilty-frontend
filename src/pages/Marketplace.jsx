import {useContext, useEffect, useState} from "react";
import "../styles/MarketplaceStyles.css";
import axiosClient from "../api/axiosClient";
import SwapRequestModal from "../components/SwapRequestModal";
import {AuthContext} from "../context/AuthContext";

const Marketplace = () => {
    const {loginState} = useContext(AuthContext);
    const [slots,
        setSlots] = useState([]);
    const [selected,
        setSelected] = useState(null);

    useEffect(() => {
        if (loginState) {
            (async() => {
                const {data} = await axiosClient.get("/api/swappable-slots");
                setSlots(data);
            })();
        }
    }, [loginState]);

    if (!loginState) {
        return (
            <div className="marketPlace-main-div">
                <div className="marketPlace-msg">Please Login to view Marketplace</div>
            </div>
        );
    }

    return (
        <div className="marketplace-container">
            <h2>Available Swaps</h2>
            <ul className="event-list">
                {slots.map((slot) => (
                    <li key={slot.id} className="event-card">
                        <span className="event-title">{slot.title}</span>
                        <span>Owner: {slot.ownerName}</span>
                        <button className="toggle-btn" onClick={() => setSelected(slot)}>
                            Request Swap
                        </button>
                    </li>
                ))}
            </ul>

            {selected && (<SwapRequestModal
                theirEvent={selected}
                onClose={(refresh) => {
                setSelected(null);
                if (refresh) {
                    axiosClient
                        .get("/api/swappable-slots")
                        .then((r) => setSlots(r.data));
                }
            }}/>)}
        </div>
    );
};

export default Marketplace;