// import React from "react";

// export default function AdminPage() {
//     return (
//         <div>
//             <h1>Admin</h1>
//             <img src="https://www.facebook.com/images/fb_icon_325x325.png" />
//         </div>
//     );
// }

import { Link } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";

function Admin() {

    return (
        <div>
            <h3>Admin Page!!!!!! Please Login or Register</h3>
            <nav>
                <ul>
                    <li>
                        <Link to="/app">App</Link>
                    </li>
                </ul>
            </nav>
        </div>

    )
}

export default Admin