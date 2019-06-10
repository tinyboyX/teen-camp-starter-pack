import "./index.css";
import './mx.css';

import riot from "riot";
import "./tags/signin.tag";
import route from "riot-route";

route.base("/")
route("/signin",() =>{
    riot.mount("#root","signin")    
});
route.start(true);

