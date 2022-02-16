import React from 'react';
import {
  Edit,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  BooleanInput,
  ArrayInput,
  required,
  maxLength,
} from 'react-admin';


const validate = {
  name: [maxLength(128), required()],
  code: [maxLength(128), required()],
};

const SubsidiaryTitle = ({ record }) => {
  return <span>{`Sucursal ${record.name} `}</span>;
}
  
const SubsidiaryEdit = (props) => {
  return (
    <Edit title={<SubsidiaryTitle />} {...props}>
      <SimpleForm
        variant="standard"
      >
        <TextInput source='name'  validate={validate.name} />
        <TextInput source='code'  validate={validate.code} />
        <ArrayInput source="totems">
          <SimpleFormIterator>
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
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
}

export default SubsidiaryEdit;