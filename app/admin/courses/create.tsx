import React from 'react'
import { Create, required, SimpleForm, TextField, TextInput } from 'react-admin'

type Props = {}

const CoursesCreate = (props: Props) => {
  return (
    <Create>
        <SimpleForm>
            <TextInput source='title' validate={[required()]}  label="Title" />
            <TextInput source='imageSrc' validate={[required()]}  label="Image" />
            <TextInput source='id' validate={[required()]}  label="Id" />
        </SimpleForm>
    </Create>
  )
}

export default CoursesCreate