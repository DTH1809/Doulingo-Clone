import React from 'react'
import { Create, Edit, NumberInput, ReferenceInput, required, SimpleForm, TextInput } from 'react-admin'

type Props = {}

const LessonsEdit = (props: Props) => {
  return (
    <Edit>
        <SimpleForm>
            <NumberInput source='id' validate={[required()]}  label="Id" />
            <TextInput source='title' validate={[required()]}  label="Title" />
            <ReferenceInput source='unitId' reference='units' />
            <NumberInput source='order' validate={[required()]}  label="order" />
        </SimpleForm>
    </Edit>
  )
}

export default LessonsEdit