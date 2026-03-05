import React, { createContext, useState } from "react";

export const context = createContext();

export const ContextProvider = ({ children }) => {
    const [book, setBook] = useState({
        hotelId: "",
        hotelName: "",
        roomId: "",
        roomType: "",
        roomPrice: 0
    });

    const [roomSelect, setRoomSelect] = useState(false);

    return (
        <context.Provider value={{ book, setBook, roomSelect, setRoomSelect }}>
            {children}
        </context.Provider>
    );
};
