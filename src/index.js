import riot from "riot";
import "./tags/signin.tag";
import route from "riot-route";
import "./index.css";
import './mx.css';
import{mxFirebase} from './mx';
var firebaseConfig = {
    apiKey: "AIzaSyDEbqkapfdiI8CDkCJabhi1UZ3Oh74q-bw",
    authDomain: "code-camp-2019-demo-66cff.firebaseapp.com",
    databaseURL: "https://code-camp-2019-demo-66cff.firebaseio.com",
    projectId: "code-camp-2019-demo-66cff",
    storageBucket: "code-camp-2019-demo-66cff.appspot.com",
    messagingSenderId: "24369682713",
    appId: "1:24369682713:web:ed6e981182d48107"
  };

mxFirebase.init(firebaseConfig);


route.base("/")
route("/signin",() =>{
    riot.mount("#root","signin")    
});
route.start(true);

