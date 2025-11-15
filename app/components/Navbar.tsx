"use client";

import Avatar from "boring-avatars";

function Navbar() {
    return (  
        <div className="h-full flex flex-col justify-between items-center py-5">
            <button>Botón y no pelado</button>
            <Avatar name="Alice Paul" variant="beam"/>
        </div>
    );
}

export default Navbar;