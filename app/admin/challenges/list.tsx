import React from 'react'
import { Datagrid, List, NumberField, ReferenceField, SelectField, TextField } from "react-admin"

type Props = {}

const ChallengesList = (props: Props) => {
  return (
    <List>
        <Datagrid rowClick="edit">
            <NumberField source='id' />
            <SelectField 
              source='type' 
              choices={[
                {
                  id: "SELECT",
                  name: "SELECT",
                },
                {
                  id: "ASSIST",
                  name: "ASSIST",
                },
              ]}
            />
            <TextField source='question' />
            <ReferenceField source='lessonId' reference='lessons' />
            <NumberField source='order' />
        </Datagrid>
    </List>
  )
}

export default ChallengesList