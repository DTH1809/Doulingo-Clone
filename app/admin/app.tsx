"use client"

import { Admin, ListGuesser, Resource } from "react-admin"
import simpleRestProvider from "ra-data-simple-rest"
import CoursesList from "./courses/list"
import CoursesCreate from "./courses/create"
import CoursesEdit from "./courses/edit"
import UnitsList from "./units/list"
import UnitsCreate from "./units/create"
import UnitsEdit from "./units/edit"
import LessonsList from "./lessons/list"
import LessonsCreate from "./lessons/create"
import LessonsEdit from "./lessons/edit"
import ChallengesList from "./challenges/list"
import ChallengesCreate from "./challenges/create"
import ChallengesEdit from "./challenges/edit"
import ChallengeOptionsList from "./challengeOptions/list"
import ChallengeOptionsCreate from "./challengeOptions/create"
import ChallengeOptionsEdit from "./challengeOptions/edit"

const dataProvider = simpleRestProvider("/api")

const App = () => {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource
                name="courses"
                recordRepresentation={"title"}
                list={CoursesList}
                create={CoursesCreate}
                edit={CoursesEdit}
            />
            <Resource
                name="units"
                recordRepresentation={"title"}
                list={UnitsList}
                create={UnitsCreate}
                edit={UnitsEdit}
            />
            <Resource
                name="lessons"
                recordRepresentation={"title"}
                list={LessonsList}
                create={LessonsCreate}
                edit={LessonsEdit}
            />
            <Resource
                name="challenges"
                recordRepresentation={"title"}
                list={ChallengesList}
                create={ChallengesCreate}
                edit={ChallengesEdit}
            />
            <Resource
                name="challengeOptions"
                recordRepresentation={"text"}
                list={ChallengeOptionsList}
                create={ChallengeOptionsCreate}
                edit={ChallengeOptionsEdit}
                options={{ label: "Challenge Options" }}
            />
        </Admin>
    )
}

export default App