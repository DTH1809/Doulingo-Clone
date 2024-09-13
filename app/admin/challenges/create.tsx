import React from 'react'
import { Create, NumberInput, ReferenceInput, required, SelectInput, SimpleForm, TextField, TextInput } from 'react-admin'

type Props = {}

const ChallengesCreate = (props: Props) => {
  return (
    <Create>
        <SimpleForm>
            <NumberInput source='id' validate={[required()]}  label="Id" />
            <SelectInput source='type'
              choices={[
                {
                  id: "SELECT",
                  name: "SELECT"
                },
                {
                  id: "ASSIST",
                  name: "ASSIST"
                }
              ]}
              validate={[required()]}
            />
            <TextInput source='question' validate={[required()]}  label="Question" />
            <ReferenceInput source='lessonId' reference='lessons' />
            <NumberInput source='order' validate={[required()]}  label="order" />
        </SimpleForm>
    </Create>
  )
}

export default ChallengesCreate