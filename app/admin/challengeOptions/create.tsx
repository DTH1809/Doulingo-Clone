import React from 'react'
import { BooleanInput, Create, NumberInput, ReferenceInput, required, SelectInput, SimpleForm, TextField, TextInput } from 'react-admin'

type Props = {}

const ChallengeOptionsCreate = (props: Props) => {
  return (
    <Create>
        <SimpleForm>
            <NumberInput source='id' validate={[required()]}  label="Id" />
            <TextInput source='challengeId' label="Challenge Id" />
            <TextInput source='text' validate={[required()]}  label="Text" />
            <BooleanInput source='correct' label="Correct option" />
            <TextInput source='imageSrc' label="Image Url" />
            <TextInput source='audioSrc' label="Audio Url" />
        </SimpleForm>
    </Create>
  )
}

export default ChallengeOptionsCreate