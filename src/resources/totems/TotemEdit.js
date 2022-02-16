import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  TextField,
  required,
  maxLength,
  BooleanInput,
  ArrayInput,
  SimpleFormIterator,
  ReferenceInput,
  SelectInput,
} from 'react-admin';


const validate = {
  name: [maxLength(128), required()],
  code: [maxLength(128), required()],
};

const TotemTitle = ({ record }) => {
  return <span>{`Totem ${record.code} `}</span>;
}
  
const TotemEdit = (props) => {
  return (
    <Edit title={<TotemTitle />} {...props}>
      <SimpleForm
        
      >
        <TextField source="id" />
        <ReferenceInput label="Sucursal" source="subsidiary_id" reference="subsidiaries">
          <SelectInput optionText="name"/>
        </ReferenceInput>
        <TextInput source="code" label="Codigo"/>
        <TextInput source="ip" label="Ip" />
        <ArrayInput source="functionalities" label="Funcionalidades">
          <SimpleFormIterator>
            <TextInput source="name" label="Nombre"/>
            <TextInput source="label" label="Etiqueta" />
            <TextInput source="icon" label="Icono" />
            <BooleanInput source="hidden" label="Ocultar" />
            <BooleanInput source="disabled" label="Deshabilitar" />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
}

export default TotemEdit;