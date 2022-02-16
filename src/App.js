// in src/App.js
import * as React from "react";
import { Admin, Resource } from 'react-admin';
import { UserList,  UserEdit } from './resources/users';
import { SubsidiaryList, SubsidiaryEdit } from './resources/subsidiaries';
import { TotemList, TotemEdit, TotemShow } from "./resources/totems";
import authProvider from './providers/authProvider';
import dataProvider from "./providers/dataProvider";
import Theme from "./Theme";

const App = () => (
    <Admin 
      dataProvider={dataProvider}
      authProvider={authProvider}
      theme={Theme}
    >
        <Resource label="usuarios" name="users" list={UserList} edit={UserEdit} />
        <Resource name="subsidiaries" list={SubsidiaryList} edit={SubsidiaryEdit} />
        <Resource name="totems" list={TotemList} edit={TotemEdit} show={TotemShow} />
    </Admin>
);

export default App;