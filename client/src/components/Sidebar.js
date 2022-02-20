import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchResult } from "../redux/features/itemSlice";
import "./Sidebar.css";
import { components } from "react-select";
import Select from "react-select";
import axios from "axios";
import { SERVER_URL } from "../ConstantValue";
import { Dropdown, DropdownButton, Button } from "react-bootstrap";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";

function Sidebar() {
  const dispatch = useDispatch();
  const [checkedBrands, setCheckedBrands] = useState([]);
  const [checkedYears, setCheckedYears] = useState([]);
  const [priceSort, setPriceSort] = useState("asc");
  // const [conditions, setConditions] = useState({
  //   brand: checkedBrands,
  //   year: checkedYears,
  //   currentPrice: priceSort,
  // });
  const filter = {
    brand: checkedBrands,
    year: checkedYears,
    currentPrice: priceSort,
  };

  const handleOnchangeBrands = (val) => {
    setCheckedBrands(val);
    console.log(checkedBrands);
  };

  const handleOnchangeYears = (val) => {
    setCheckedYears(val);
    console.log(checkedYears);
  };

  const clearFilters = (e) => {
    e.preventDefault();
    setCheckedBrands([]);
    setCheckedYears([]);
    setPriceSort("");
  };

  const ApplyFilterBtnOnClick = async (e) => {
    e.preventDefault();
    const conditions = {
      brand: checkedBrands,
      year: checkedYears,
      currentPrice: priceSort,
    };
    console.log("Filter btn clicked", conditions);
    try {
      //Set request header
      const config = {
        headers: {
          "Content-Type": "Application/json",
        },
      };
      console.log("try block conditions: ");
      const res = await axios.post(
        `${SERVER_URL}item/all/filter`,
        conditions,
        config
      );
      dispatch(setSearchResult(res.data));
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // console.log("selected brands: ", checkedBrands);
    // console.log("selected years: ", checkedYears);
    console.log(filter);
    console.log(priceSort);
  }, [checkedBrands, checkedYears, filter, priceSort]);

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

  const priceOrder = [{}];

  return (
    <div className="sidebar">
      <h2>Filter</h2>
      <div className="preview-values">
        <h4>Brands</h4>
        {checkedBrands}
      </div>
      <MultiSelect
        className="mselect"
        onChange={handleOnchangeBrands}
        options={brandOptions}
        name="checkedBrands"
      />
      <div className="preview-values">
        <h4>Year Make</h4>
        {checkedYears}
      </div>
      <MultiSelect
        className="mselect"
        onChange={handleOnchangeYears}
        options={yearOptions}
        name="checkedYears"
      />
      <div className="sort">
        <h4>Sort Price</h4>
        <label>
          <input
            type="radio"
            value="Ascending"
            name="gender"
            onClick={() => {
              setPriceSort("asc");
            }}
          />{" "}
          Ascending
        </label>
        <label>
          <input
            type="radio"
            value="Descending"
            name="gender"
            onClick={() => {
              setPriceSort("desc");
            }}
          />{" "}
          Descending
        </label>
      </div>
      <div>
        <Button
          className="fillWidth btn"
          onClick={(e) => {
            ApplyFilterBtnOnClick(e);
          }}
        >
          Apply Filter
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
