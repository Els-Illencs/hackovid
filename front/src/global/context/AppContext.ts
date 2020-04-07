import React from "react";

type App = {
    user: any, // TODO define type any
    // TODO add more global data
}

export const AppContext = React.createContext<App>({} as any);


