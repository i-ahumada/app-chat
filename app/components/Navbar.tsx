"use client";

import Avatar from "boring-avatars";
import { useUserId } from "../context/UserContext";
import AddChatButton from "./buttons/AddChatButton";

function Navbar() {
    const userId = useUserId()
    console.log(userId)
    return (  
        <div className="h-full flex flex-col justify-between items-center py-5">
            <AddChatButton />
            <Avatar name={userId} variant="beam"/>
        </div>
    );
}

export default Navbar;