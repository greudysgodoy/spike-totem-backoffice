import * as React from "react";
import { List, Datagrid, TextField } from 'react-admin';

const SubsidiaryList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="code" />
        </Datagrid>
    </List>
);

export default SubsidiaryList;