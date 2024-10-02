import React from "react";
import { Link } from "react-router-dom";
import ConnectToTurno from "./connectTurnoButton";

const IntegrationsIndex = () => {
  return (
    <div>
      <h3 className="mb-4">Integrations</h3>
     <ConnectToTurno />
    </div>
  );
};

export default IntegrationsIndex;
