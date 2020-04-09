import React, { FC, ReactNode, useState } from "react";
import { ApplicationBar } from "./ApplicationBar";
import { Switch, Route, Link } from "react-router-dom";
import { makeStyles, Drawer, List, ListItem, ListItemText } from "@material-ui/core";

type Page = {
  label: string,
  path: string
  content: ReactNode
};

type AppLayoutProps = {
  pages: Page[]
};

const useStyles = makeStyles((theme) => ({
  content: {
    padding: 20,
    marginTop: 30
  }
}))

const AppLayout: FC<AppLayoutProps> = (props) => {
  const styles = useStyles(props);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () =>  setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return(<>
    <ApplicationBar onMenuButtonClick={openDrawer} />
    <main className={styles.content}>
      <Drawer anchor="left" open={drawerOpen} onClose={closeDrawer}>
        <List>
          {props.pages.map((p) => (
            <ListItem button component={Link} to={p.path} onClick={closeDrawer} key={p.path}>
              <ListItemText primary={p.label}/>
            </ListItem>
          ))}
        </List>
      </Drawer>
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
