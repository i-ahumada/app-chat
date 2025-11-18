"use client";

import Avatar from "boring-avatars";
import { useUserId } from "../context/UserContext";

function Navbar() {
    const userId = useUserId()
    console.log(userId)
    return (  
        <div className="h-full flex flex-col justify-between items-center py-5">
            <button>Botón y no pelado</button>
            <Avatar name={userId} variant="beam"/>
        </div>
    );
}

export default Navbar;