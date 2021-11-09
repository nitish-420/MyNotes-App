import AddNote from "./AddNote";
import Notes from "./Notes";
import { useHistory } from 'react-router-dom';

const Home = (props) => {
    let history=useHistory();
    
    if(!localStorage.getItem("token")){
        history.push("/login")
    }


    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <Notes showAlert={props.showAlert} />
        </>
    )
}

export default Home