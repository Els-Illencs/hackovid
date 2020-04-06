import React, { FC, useState, useEffect } from "react";
import { UsersApiClient, User } from "../api/UsersApiClient";
import { List, ListItem, ListItemText } from "@material-ui/core";

const apiClient = new UsersApiClient();

const ServerMessage: FC= () => {
    const [users, setUsers] = useState([] as User[]);
  
    useEffect(() => {
      apiClient.getAll().then(setUsers);
    }, []);
    
    return (
      <List>
        {users.map(u => 
          <ListItem>
            <ListItemText primary={u.name} secondary={u.company} />
          </ListItem>
        )}
      </List>
    );
}

export default ServerMessage;