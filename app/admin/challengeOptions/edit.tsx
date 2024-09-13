import React from 'react'
import { BooleanInput, Create, Edit, NumberInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from 'react-admin'

type Props = {}

const ChallengeOptionsEdit = (props: Props) => {
  return (
    <Edit>
        <SimpleForm>
            <NumberInput source='id' validate={[required()]}  label="Id" />
            <TextInput source='challengeId' label="Challenge Id" />
            <TextInput source='question' />
            <TextInput source='text' validate={[required()]}  label="Text" />
            <BooleanInput source='correct' label="Correct option" />
            <TextInput source='imageSrc' label="Image Url" />
            <TextInput source='audioSrc' label="Audio Url" />
        </SimpleForm>
    </Edit>
  )
}

export default ChallengeOptionsEdit