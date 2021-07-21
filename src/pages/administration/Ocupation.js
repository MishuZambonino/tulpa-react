import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { AuthContext } from "../../App";
import { useContext } from "react";
import SideBarMenu from "../../components/SideBarMenu";

const Ocupation = () => {
  const { user } = useContext(AuthContext);

  return <SideBarMenu />;
};

export default Ocupation;
