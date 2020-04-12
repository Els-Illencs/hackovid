import React, { useState, FC } from "react";
import { withRouter, useLocation } from "react-router-dom";

const ScrollToTop: FC = ({children}) => {
    const { pathname } = useLocation();
    const [prevPathname, setPrevPathname] = useState(pathname);

    if (pathname !== prevPathname) {
        window.scroll(0, 0);
        setPrevPathname(pathname);
    }

    return (<>{children}</>);
}

export default withRouter(ScrollToTop)