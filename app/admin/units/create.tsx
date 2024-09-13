import React from 'react'
import { Create, NumberInput, ReferenceInput, required, SimpleForm, TextField, TextInput } from 'react-admin'

type Props = {}

const UnitsCreate = (props: Props) => {
  return (
    <Create>
        <SimpleForm>
            <NumberInput source='id' validate={[required()]}  label="Id" />
            <TextInput source='title' validate={[required()]}  label="Title" />
            <TextInput source='description' validate={[required()]}  label="description" />
            <ReferenceInput source='courseId' reference='courses' />
            <NumberInput source='order' validate={[required()]}  label="order" />
        </SimpleForm>
    </Create>
  )
}

export default UnitsCreate