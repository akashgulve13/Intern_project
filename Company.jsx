import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import axios from "axios";

function Company() {
  const [Companie, setCompanie] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCompanie, setFilteredCompanie] = useState([]); //for filtered data

  //fetching dumy data from an API
  const getCompanies = async () => {
    try {
      const response = await axios.get(
        "https://fake-json-api.mock.beeceptor.com/companies"
      );
      setCompanie(response.data);
      setFilteredCompanie(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  //arranging column
  const column = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Zip",
      selector: (row) => row.zip,
    },
    {
      name: "Country",
      selector: (row) => row.country,
    },
    {
      name: "Action",
      cell: (row) => <button>N/A</button>,
    },
  ];
  //called data from api
  useEffect(() => {
    getCompanies();
  }, []);
  //filtereddata
  useEffect(() => {
    const result = Companie.filter((data) => {
      return data.name.toLowerCase().match(search.toLocaleLowerCase());
    });
    setFilteredCompanie(result);
  }, [search]);

  return (
    <>
      <div className="">
        <CSVLink data={Companie} className="btn btn-success mt-5 ">
          Export Account Data
        </CSVLink>
      </div>
      <DataTable
        title={<h1>Account List</h1>}
        columns={column}
        data={filteredCompanie}
        pagination //for pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search Here"
            className="w-25 form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
      />
    </>
  );
}

export default Company;
