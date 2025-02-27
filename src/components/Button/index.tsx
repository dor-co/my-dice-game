import "./style.scss";
import { IButton } from "../../common/types";

const Button: React.FC<IButton> = ({ label, onClick }) => {
  return (
    <button className="button-game" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
