import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { AuthContext } from "../../App";
import { useContext, useState } from "react";
import SideBarMenu from "../../components/SideBarMenu";
import { Button } from "primereact/button";
import "../../App.css";
import { addUser } from "../../services/firebase/collection/user";
import { TEACHER_PAGE } from "../../constants/routes";

const Ocupation = () => {
  const { user } = useContext(AuthContext);
  const [residenceUser, setResidenceUser] = useState([
    {
      email: "",
      full_name: "",
      id: "",
      role: "",
    },
  ]);
  const createUser = async (event) => {
    try {
      const response = await addUser(residenceUser);
      console.log("Se supone que se guardo");
    } catch (error) {
      console.log(error);
    }
    event.preventDefault();
  };

  return (
    <div className="login-container">
      <div className="login-div">
        <h1 className="login-title">Iniciar sesión</h1>
        <span className="p-float-label input-span">
          <InputText
            id="in"
            className="w-100 p-inputtext-sm p-d-block p-mb-2"
            onChange={(event) =>
              setResidenceUser({ ...residenceUser, id: event.target.value })
            }
          />
          <label htmlFor="in">Id</label>
        </span>
        <span className="p-float-label input-span">
          <InputText
            id="in"
            className="w-100 p-inputtext-sm p-d-block p-mb-2"
            onChange={(event) =>
              setResidenceUser({
                ...residenceUser,
                full_name: event.target.value,
              })
            }
          />
          <label htmlFor="in">Full Name</label>
        </span>
        <span className="p-float-label input-span">
          <InputText
            id="in"
            className="w-100 p-inputtext-sm p-d-block p-mb-2"
            onChange={(event) =>
              setResidenceUser({
                ...residenceUser,
                email: event.target.value,
              })
            }
          />
          <label htmlFor="in">Email</label>
        </span>
        <span className="p-float-label input-span">
          <InputText
            id="in"
            className="w-100 p-inputtext-sm p-d-block p-mb-2"
            onChange={(event) =>
              setResidenceUser({
                ...residenceUser,
                role: event.target.value,
              })
            }
          />
          <label htmlFor="in">Role</label>
        </span>
        <div className="sign-in-button-div">
          <Button
            type="button"
            label="Guardar"
            className="login-button"
            onClick={createUser}
          />
        </div>
      </div>
    </div>
  );
  //return <SideBarMenu />;
};

export default Ocupation;
