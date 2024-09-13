import React from 'react'
import { Datagrid, List, TextField } from "react-admin"

type Props = {}

const CoursesList = (props: Props) => {
  return (
    <List>
        <Datagrid rowClick="edit">
            <TextField source='id' />
            <TextField source='title' />
            <TextField source='imageSrc' />
        </Datagrid>
    </List>
  )
}

export default CoursesList