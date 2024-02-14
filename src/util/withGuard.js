import { useSelector } from "react-redux";

export default function withGuard(Component) {

const Wrapper =(props)=>{

const {isLoggedIn } =useSelector(state => state.auth);

return isLoggedIn ? <Component {...props}/> : <div>please log in first!</div>
}

  return Wrapper;
}
