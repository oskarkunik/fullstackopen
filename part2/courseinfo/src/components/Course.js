import React from 'react'

const Header = (props) => (
    <h1>{props.name}</h1>
)

const Part = (props) => (
    <p>
        {props.name} {props.exercises}
    </p>
)

const Content = ({parts}) => {
    const rows = () => parts.map(part =>
        <Part
            name={part.name}
            exercises={part.exercises}
            key={part.id}
        />
    )
    return (
        <>
            {rows()}
        </>
    )
}

const Total = ({parts}) => {
  const sumParts = () => parts.reduce((total, part) => total + part.exercises, 0)
  return (
    <p><b>total of {sumParts()} exercises</b></p>
  )
}

const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course