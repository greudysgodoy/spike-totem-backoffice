import React from 'react';
import {
  Show,
  SimpleForm,
  TextField,
  BooleanField,
  ArrayField,
  ReferenceField,
  ImageField,
  Datagrid,
} from 'react-admin';

const TotemTitle = ({ record }) => {
  return <span>{`Totem ${record.code} `}</span>;
}
  
const TotemShow = (props) => {
  return (
    <Show title={<TotemTitle />} {...props}>
      <SimpleForm
        variant="subtitle1"
      >
        <TextField label="Totem Id" source="id" />
        <ReferenceField label="Sucursal" source="subsidiary_id" reference="subsidiaries">
          <TextField source="name"/>
        </ReferenceField>
        <TextField source="code" label="Código"/>
        <TextField source="ip" label="Ip" />
        <ArrayField source="functionalities" label="Funcionalidades">
          <Datagrid>
            <TextField source="name" label="Nombre"/>
            <TextField source="label" label="Etiqueta" />
            <ImageField source="icon" title="Ícono" />
            <BooleanField source="hidden" label="Oculto" />
            <BooleanField source="disabled" label="Deshabilitado" />
          </Datagrid>
        </ArrayField>
      </SimpleForm>
    </Show>
  );
}

export default TotemShow;