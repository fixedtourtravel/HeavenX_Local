import React from "react";
import Loader from "react-loader-spinner";
import { Modal } from "react-bootstrap";
import "../styles/home.css";

function Loading({ Loading }) {
  return (
    <Modal show={Loading} centered dialogClassName="loading" backdrop="static">
      <div className="loadingName">Loading</div>
      <div>
        <Loader
          type="ThreeDots"
          color="black"
          height={200}
          width={200}
          timeout={10 * 60 * 1000}
          visible="true"
        />
      </div>
    </Modal>
  );
}

export default Loading;
