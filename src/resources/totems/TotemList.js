import * as React from "react";
import { List, Datagrid, TextField, ReferenceField } from 'react-admin';

const TotemList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="code" label="Codigo"/>
            <TextField source="ip" />
            <ReferenceField label="Sucursal" source="subsidiary_id" reference="subsidiaries">
                <TextField source="name"/>
            </ReferenceField>
        </Datagrid>
    </List>
);

export default TotemList;