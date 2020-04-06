import React, { FC, useState, useEffect } from "react";
import { HomeApiClient } from "../api/HomeApiClient";

const apiClient = new HomeApiClient();

const ServerMessage: FC= () => {
    const [serverMessage, setServerMessage] = useState('Wait...');
  
    useEffect(() => {
      apiClient.getHomeMessage().then(setServerMessage);
    }, []);
    
    return (
        <p>Server message: {serverMessage}</p>
    );
}

export default ServerMessage;