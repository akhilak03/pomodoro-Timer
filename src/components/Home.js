
import "./Home.css";
import {useNavigate} from 'react-router-dom';
import bg from "../Images/bgimg-2.jpg";
function Home() {
    const navigate=useNavigate();
    
    return (
        <div className="A ">
          
            <img src={bg} alt="icon" width="500px" className='d-block mx-auto p-3 m-3' />
            
            <div className="container w-50 Ab ">
              <h1 >How does it work?</h1><p>It works like a 25 minute timer on steroids! designed to study or work without procrastinating. Based on Pomodoro Technique, you can keep focused listening to soft music, checking your to do list, customizing the timer, and taking challenges to stay motivated, all with a clean and aesthetic design.</p></div>
          
           <div className="Ac">
               <button type="button" className="h" onClick={()=>{navigate("/Timer")}}> Get Started</button>
               </div>
               
        </div>

    );
}

export default Home;