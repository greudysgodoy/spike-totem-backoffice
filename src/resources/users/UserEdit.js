import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  maxLength,
  minLength,
  email,
} from 'react-admin';


const validate = {
  firstName: [maxLength(128), required()],
  lastName: [maxLength(128), required()],
  email:  [maxLength(128), required(), email()],
  phone: [maxLength(16), required()],
  dni: [maxLength(32), required()],
  password: [maxLength(16), minLength(8), required()],
  address: [maxLength(128), required()],
  role_id: [required()],
};

const UserTitle = ({ record }) => {
  return <span>{`Usuario ${record.email} `}</span>;
}
  
const UserEdit = (props) => {
  return (
    <Edit title={<UserTitle />} {...props}>
      <SimpleForm
        variant="standard"
      >
        <TextInput source='firstName'  validate={validate.firstName} />
        <TextInput source='lastName'  validate={validate.lastName} />
        <TextInput source='email' validate={validate.email} />
        <TextInput source='phone' validate={validate.phone}  />
        <TextInput source='dni' validate={validate.dni} />
        <TextInput source='address' validate={validate.address}  />
      </SimpleForm>
    </Edit>
  );
}

export default UserEdit;