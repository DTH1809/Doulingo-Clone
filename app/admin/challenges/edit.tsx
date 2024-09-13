import React from 'react'
import { Create, Edit, NumberInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from 'react-admin'

type Props = {}

const ChallengesEdit = (props: Props) => {
  return (
    <Edit>
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
    </Edit>
  )
}

export default ChallengesEdit