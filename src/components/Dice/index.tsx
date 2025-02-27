import "./style.scss";
import { IDice } from "../../common/types";

const Dice: React.FC<IDice> = ({ score }) => {
  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        border: "1px solid",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "32px",
      }}
    >
      {score}
    </div>
  );
};

export default Dice;
