import React from "react";
import { MDBCol } from "mdbreact";


const Search = () => {
  return (
    <MDBCol md="9">
      <input className="form-control" type="text" placeholder="Search" aria-label="Search"/>
    </MDBCol>
  );
}

export default Search;