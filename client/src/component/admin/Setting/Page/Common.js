import React from "react";
import { Button } from "react-bootstrap";
import style from "./Page.module.css";

function Common({ name }) {
  return (
    <div className={style.body}>
      <div>
        {name === "Vender" && <p>Default Vendor Theme</p>}
        {name === "Customer" && <p>Default Customer Theme</p>}
        {name === "Home" && <p>Default Theme</p>}
        <select>
          <option>harsh</option>
          <option>sinha</option>
        </select>
      </div>
      <div>
        <p>Default Country</p>
        <select>
          <option>harsh</option>
          <option>sinha</option>
        </select>
      </div>
      <div>
        <p>Visible Tools{name !== "Home" ? "(Profile)" : ""} </p>
        <select>
          <option>harsh</option>
          <option>sinha</option>
        </select>
      </div>
      {name !== "Home" && (
        <>
          <div>
            <p>Company Field is required?</p>
            <input type="radio" id="Yes" name="Company_Field" value="Yes" />
            <label for="Yes">Yes</label>
            <input type="radio" id="No" name="Company_Field" value="No" />
            <label for="No">No</label>
            <br></br>
          </div>
          <div>
            <p>Company requires the usage of thrr VAT Number Field</p>
            <input type="radio" id="Yes" name="Company_Field" value="Yes" />
            <label for="Yes">Yes</label>
            <input type="radio" id="No" name="Company_Field" value="No" />
            <label for="No">No</label>
            <br></br>
          </div>
          <div>
            <p>Allow {name} to register</p>
            <input type="radio" id="Yes" name="Company_Field" value="Yes" />
            <label for="Yes">Yes</label>
            <input type="radio" id="No" name="Company_Field" value="No" />
            <label for="No">No</label>
            <br></br>
          </div>
          <div>
            <p>
              Require registration confirmation from adminstrator after {name}{" "}
              register
            </p>
            <input type="radio" id="Yes" name="Company_Field" value="Yes" />
            <label for="Yes">Yes</label>
            <input type="radio" id="No" name="Company_Field" value="No" />
            <label for="No">No</label>
            <br></br>
          </div>
          <div>
            <p>Allow primary contact to manage other {name} contacts</p>
            <input type="radio" id="Yes" name="Company_Field" value="Yes" />
            <label for="Yes">Yes</label>
            <input type="radio" id="No" name="Company_Field" value="No" />
            <label for="No">No</label>
            <br></br>
          </div>
          <div>
            <p>Allow primary contact to view/edit billing & shipping details</p>
            <input type="radio" id="Yes" name="Company_Field" value="Yes" />
            <label for="Yes">Yes</label>
            <input type="radio" id="No" name="Company_Field" value="No" />
            <label for="No">No</label>
            <br></br>
          </div>
          <div>
            <p>
              Allow primary contact to delete own files uploaded from {name}{" "}
              area
            </p>
            <input type="radio" id="Yes" name="Company_Field" value="Yes" />
            <label for="Yes">Yes</label>
            <input type="radio" id="No" name="Company_Field" value="No" />
            <label for="No">No</label>
            <br></br>
          </div>
          <div>
            <p>Use knowledge Base</p>
            <input type="radio" id="Yes" name="Company_Field" value="Yes" />
            <label for="Yes">Yes</label>
            <input type="radio" id="No" name="Company_Field" value="No" />
            <label for="No">No</label>
            <br></br>
          </div>
          <div>
            <p>Use knowledge Base to be view without registration</p>
            <input type="radio" id="Yes" name="Company_Field" value="Yes" />
            <label for="Yes">Yes</label>
            <input type="radio" id="No" name="Company_Field" value="No" />
            <label for="No">No</label>
            <br></br>
          </div>
          <div>
            <p>Show Estimate request link in {name} area</p>
            <input type="radio" id="Yes" name="Company_Field" value="Yes" />
            <label for="Yes">Yes</label>
            <input type="radio" id="No" name="Company_Field" value="No" />
            <label for="No">No</label>
            <br></br>
          </div>
          <div>
            <p>Default Contact permission</p>
            <input
              type="radio"
              id="Invoices"
              name="Invoices"
              value="Invoices"
            />
            <label for="Invoices">Invoices</label>
            <br />
            <input
              type="radio"
              id="Estimates"
              name="Estimates"
              value="Estimates"
            />
            <label for="Estimates">Estimates</label>
            <br />
            <input
              type="radio"
              id="Contacts"
              name="Contacts"
              value="Contacts"
            />
            <label for="Contacts">Contacts</label>
            <br />
            <input
              type="radio"
              id="Proposals"
              name="Proposals"
              value="Proposals"
            />
            <label for="Proposals">Proposals</label>
            <br />
            <input type="radio" id="Support" name="Support" value="Support" />
            <label for="Support">Support</label>
            <br />
            <input
              type="radio"
              id="Projects"
              name="Projects"
              value="Projects"
            />
            <label for="Projects">Projects</label>
            <br />
            <input type="radio" id="Items" name="Items" value="Items" />
            <label for="Items">Items</label>
            <br />
          </div>
        </>
      )}
      <Button variant="warning">Save</Button>
    </div>
  );
}

export default Common;
