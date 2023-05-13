import {Table, Nav} from 'react-bootstrap'
import { FiShoppingCart } from "react-icons/fi"
import { FiEdit } from "react-icons/fi"
import { FiThumbsUp } from "react-icons/fi"
import { FiUser } from "react-icons/fi"
import { useNavigate } from "react-router-dom";

function MyPage() {
  let navigate = useNavigate();
    return (
      <Nav defaultActiveKey="/home" className="flex-column">
         <div className="mypageName">My Page</div>
         <br></br>
         <br></br>
         <div className="mypageBottom">
        <Nav.Link href="/myinfo" style = {{color : "black"}}><FiUser /> My information</Nav.Link>
        <br></br>
        <Nav.Link href="/cart" style = {{color : "black"}}><FiShoppingCart /> Order List</Nav.Link>
        <br></br>
        <Nav.Link href="/reviewpage" style = {{color : "black"}}><FiThumbsUp /> Write Review</Nav.Link>
        <br></br>
        <Nav.Link href="/home" style = {{color : "black"}}><FiEdit /> Modify My information</Nav.Link>
        </div>
      </Nav>
      )

}

export default MyPage;