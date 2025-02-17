import {db} from '../firebase.js';
import { getDatabase, ref, child, get } from "firebase/database";
import {useNavigate} from "react-router-dom";

function SignIn(){
    var navigate = useNavigate();

    function clicked(){

        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/`)).then((snapshot) => {
          if (snapshot.exists()) {
            var data = snapshot.val()
            for(var key in data){
                if(key==document.getElementById('signinemail').value.replace('@','_').replace('.','_')&&data[key]['password']==document.getElementById('signinpassword').value){
                    localStorage.setItem('userinfo',JSON.stringify([key,data[key]]))
                    console.log(localStorage.getItem('userinfo'));
                    navigate('/dashboard/');
                }
            }
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
    }
    return (
        <div class="signin-box" >
            <div class="signin-text">SIGN IN</div>

            <div class="input-group mb-3" id="signin-email">
                <span class="input-group-text" id="basic-addon1">@Email</span>
                <input type="text" class="form-control" id='signinemail' aria-label="Email" aria-describedby="basic-addon1"></input>
            </div>

            <div class="input-group mb-3" id="signin-password">
                <span class="input-group-text" id="basic-addon1">Password</span>
                <input type="password" class="form-control" aria-label="password" id="signinpassword" aria-describedby="basic-addon1"></input>
            </div>
        
            <button type="button" onClick={()=>{clicked()}} class="btn btn-outline-secondary" >Log In</button>

            
        </div>
    )
}

export default SignIn