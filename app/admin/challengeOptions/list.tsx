import React from 'react'
import { BooleanField, Datagrid, List, NumberField, ReferenceArrayField, ReferenceField, SelectField, TextField } from "react-admin"

type Props = {}

const ChallengeOptionsList = (props: Props) => {
  return (
    <List>
        <Datagrid rowClick="edit">
            <NumberField source='id' />
            <TextField source='challengeId' label="Challenge Id"/>
            <TextField source='question' />
            <TextField source='text' />
            <BooleanField source='correct' />
            <TextField source='imageSrc' />
            <TextField source='audioSrc' />
        </Datagrid>
    </List>
  )
}

export default ChallengeOptionsList