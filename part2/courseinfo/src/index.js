import React from 'react'
import ReactDOM from 'react-dom'

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

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))