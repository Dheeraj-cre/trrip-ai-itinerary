import { Link } from "react-router-dom";
import {
    FaHome,
    FaUpload,
    FaHistory,
    FaSignOutAlt
} from "react-icons/fa";

import "./Sidebar.css";

export default function Sidebar(){

return(

<div className="sidebar">

<h2>Trrip AI</h2>

<Link to="/">
<FaHome/>
Dashboard
</Link>

<Link to="/upload">
<FaUpload/>
Upload
</Link>

<Link to="/history">
<FaHistory/>
History
</Link>

<Link to="/login">
<FaSignOutAlt/>
Logout
</Link>

</div>

)

}