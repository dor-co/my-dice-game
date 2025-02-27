import "./style.scss";
import { IInput } from "../../common/types";

const Input: React.FC<IInput> = ({ onChange, value, placeholder, type }) => {
  return (
    <input
      className="input-game"
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      type={type}
    />
  );
};

export default Input;
