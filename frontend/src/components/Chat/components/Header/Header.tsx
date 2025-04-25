import Launch from "../../../assets/Launch.png";
import Earth from "../../../assets/EarthPlanet.png";
import Exit from "../../../assets/BoxArrowRight.png";

type HeaderProps = {
  onClick: () => void;
};

export const Header: React.FC<HeaderProps> = ({ onClick }) => {
  return (
    <div className="header">
      <div className="header-logo">
        <span>FTL</span>
        <img src={Launch} className="header-logo-image"></img>
        <span>Talk</span>
      </div>
      <div className="header-options">
        <img src={Earth} className="options-image"></img>
        <a onClick={onClick}>
          <img src={Exit} className="options-image"></img>
        </a>
      </div>
    </div>
  );
};
