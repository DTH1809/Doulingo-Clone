import React from 'react'
import { Create, NumberInput, ReferenceInput, required, SimpleForm, TextField, TextInput } from 'react-admin'

type Props = {}

const LessonsCreate = (props: Props) => {
  return (
    <Create>
        <SimpleForm>
            <NumberInput source='id' validate={[required()]}  label="Id" />
            <TextInput source='title' validate={[required()]}  label="Title" />
            <ReferenceInput source='unitId' reference='units' />
            <NumberInput source='order' validate={[required()]}  label="order" />
        </SimpleForm>
    </Create>
  )
}

export default LessonsCreate