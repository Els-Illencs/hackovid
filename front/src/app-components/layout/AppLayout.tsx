import React, { FC, ReactNode } from "react";
import { ApplicationBar } from "./ApplicationBar";
import { Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

type Page = {
  label: string,
  path: string
  content: ReactNode
};

type AppLayoutProps = {
  pages: Page[],
  onTapMenu: () => void
};

const useStyles = makeStyles((theme) => ({
  content: {
    padding: 20
  }
}))

const AppLayout: FC<AppLayoutProps> = (props) => {
  const styles = useStyles(props);

  return(<>
    <ApplicationBar menuItems={props.pages} />
    <main className={styles.content}>
      <Switch>
        {props.pages.map((p, i) => 
            <Route path={p.path} key={i} exact={p.path === '/'}>
              {p.content}
            </Route>
        )}
      </Switch>
    </main>

  </>);
};

export default AppLayout;
