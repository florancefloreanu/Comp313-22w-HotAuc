import React, { useState, useEffect, useRef } from "react";
import "./Sidebar.css";
import { components } from "react-select";
import Select from "react-select";
import axios from "axios";
import { SERVER_URL } from "../ConstantValue";
import { Dropdown } from "react-bootstrap";

function Sidebar() {
  const ref = useRef();
  const [checkedBrands, setCheckedBrands] = useState([]);
  const [checkedYears, setCheckedYears] = useState([]);
  const [showBrands, setShowBrands] = useState(false);
  const [showYears, setShowYears] = useState(false);
  const [checked, setChecked] = useState([]);
  const handleChecked = (e, index, filter, setFilter) => {
    e.preventDefault();
    console.log("hit", index);
    let prev = filter;
    let itemIndex = prev.indexOf(index);
    if (itemIndex !== -1) {
      prev.splice(itemIndex, 1);
    } else {
      prev.push(index);
    }
    setFilter([...prev]);
  };

  useEffect(() => {
    console.log("selected brands: ", checkedBrands);
    console.log("selected years: ", checkedYears);
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (showBrands && ref.current && !ref.current.contains(e.target)) {
        setShowBrands(false);
      }
    };

    const checkIfClickedOutside2 = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (showYears && ref.current && !ref.current.contains(e.target)) {
        setShowYears(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);
    document.addEventListener("mousedown", checkIfClickedOutside2);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
      document.removeEventListener("mousedown", checkIfClickedOutside2);
    };
  }, [checkedBrands, checkedYears, showBrands, showYears]);

  const brandOptions = [
    { value: "Mazda", label: "Mazda" },
    { value: "Ford", label: "Ford" },
    { value: "Porsche", label: "Porsche" },
    { value: "BMW", label: "BMW" },
    { value: "Honda", label: "Honda" },
    { value: "Toyota", label: "Toyota" },
    { value: "Ferrari", label: "Ferrari" },
    { value: "Lamborghini", label: "Lamborghini" },
    { value: "Chevrolet", label: "Chevrolet" },
  ];

  const yearOptions = [
    { value: "2000", label: "2000" },
    { value: "2001", label: "2001" },
    { value: "2002", label: "2002" },
    { value: "2003", label: "2003" },
    { value: "2004", label: "2004" },
    { value: "2005", label: "2005" },
    { value: "2006", label: "2006" },
    { value: "2007", label: "2007" },
    { value: "2008", label: "2008" },
    { value: "2009", label: "2009" },
    { value: "2010", label: "2010" },
    { value: "2012", label: "2012" },
    { value: "2017", label: "2017" },
    { value: "2018", label: "2018" },
    { value: "2019", label: "2019" },
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
  ];

  const RenderBrands = ({
    title,
    options,
    filter,
    setFilter,
    show,
    setShow,
  }) => {
    return (
      <div className="spanAcross">
        <Dropdown show={show} ref={ref}>
          <Dropdown.Toggle
            // onClick={() => {
            //   setShow(!show);
            // }}
            onClick={() => {
              setShow((oldState) => !oldState);
            }}
          >
            {title}:
          </Dropdown.Toggle>
          <Dropdown.Menu className="scroll">
            {options.map((item, index) => (
              <li className="chkbox" key={index}>
                <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  checked={filter.includes(item.label)}
                  onChange={(e) =>
                    handleChecked(e, item.label, filter, setFilter)
                  }
                />
                <label htmlFor={`custom-checkbox-${index}`}>{item.label}</label>
              </li>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };

  return (
    <div className="sidebar">
      <RenderBrands
        title={"Brands"}
        options={brandOptions}
        filter={checkedBrands}
        setFilter={setCheckedBrands}
        show={showBrands}
        setShow={setShowBrands}
      />
      <RenderBrands
        title={"Years"}
        options={yearOptions}
        filter={checkedYears}
        setFilter={setCheckedYears}
        show={showYears}
        setShow={setShowYears}
      />
    </div>
  );
}

export default Sidebar;
