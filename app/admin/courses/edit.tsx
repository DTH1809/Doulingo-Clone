import React from 'react'
import { Create, Edit, required, SimpleForm, TextInput } from 'react-admin'

type Props = {}

const CoursesEdit = (props: Props) => {
  return (
    <Edit>
        <SimpleForm>
            <TextInput source='title' validate={[required()]}  label="Title" />
            <TextInput source='imageSrc' validate={[required()]}  label="Image" />
            <TextInput source='id' validate={[required()]}  label="Id" />
        </SimpleForm>
    </Edit>
  )
}

export default CoursesEdit