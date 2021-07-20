import React, { Component, useContext } from "react";
import { SlideMenu } from "primereact/slidemenu";
import { NUMERARIA_ITEMS, RESIDENT_ITEMS } from "../../constants/menuItems";
import { useLocation, withRouter } from "react-router-dom";
import "./style.scss";

const SideBarMenu = ({ selected, history }) => {
  const onSelect = (selected) => {
    selected && history.push({ pathname: "/" + selected });
    setSelected(selected);
  };
  return (
    <div>
      <div className="card">
        <SlideMenu
          model={NUMERARIA_ITEMS}
          viewportHeight={700}
          menuWidth={175}
        />
      </div>
    </div>
  );
};
export default withRouter(SideBarMenu);
