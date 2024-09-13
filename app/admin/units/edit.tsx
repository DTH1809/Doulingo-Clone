import React from 'react'
import { Create, Edit, NumberInput, ReferenceInput, required, SimpleForm, TextInput } from 'react-admin'

type Props = {}

const UnitsEdit = (props: Props) => {
  return (
    <Edit>
        <SimpleForm>
            <NumberInput source='id' validate={[required()]}  label="Id" />
            <TextInput source='title' validate={[required()]}  label="Title" />
            <TextInput source='description' validate={[required()]}  label="description" />
            <ReferenceInput source='courseId' reference='courses' />
            <NumberInput source='order' validate={[required()]}  label="order" />
        </SimpleForm>
    </Edit>
  )
}

export default UnitsEdit