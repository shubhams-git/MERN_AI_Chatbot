import { Link } from "react-router";

type Props = {
    to: string;
    bg: string;
    text: string;
    textColor: string;
    onClick?: ()=> Promise<void>;
}


const NavigationLink = (props:Props) => {
  return (<div>
    <Link to={props.to}
    style={{background:props.bg, color:props.textColor}}
    className="nav-link">{props.text}</Link>
  </div>
  )
}

export default NavigationLink