import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const Feedback = (props) => (
    <>
        <Button handleClick={() => props.setGood(props.good + 1)} text="good" />
        <Button handleClick={() => props.setNeutral(props.neutral + 1)} text="neutral" />
        <Button handleClick={() => props.setBad(props.bad + 1)} text="bad" />
    </>
)

const Statistics = (props) => {
    const calcSum = () => props.good + props.neutral + props.bad
    const calcAverage = () => calcSum() > 0 ?  (props.good - props.bad) / calcSum() : 0
    const calcPositive = () => calcSum() > 0 ? props.good / calcSum() * 100 : 0

    if (calcSum() === 0) {
        return (
            <p>No feedback given</p>
        )
    }

    return (
        <>
            <div>good {props.good}</div>
            <div>neutral {props.neutral}</div>
            <div>bad {props.bad}</div>
            <div>all {calcSum()}</div>
            <div>average {calcAverage()}</div>
            <div>positive {calcPositive()} %</div>
        </>
    )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <Feedback
                good={ good }
                setGood={ setGood }
                neutral={ neutral }
                setNeutral={ setNeutral }
                bad={ bad }
                setBad={ setBad }

            />
            <h1>statistics</h1>
            <Statistics
                good={ good }
                neutral={ neutral }
                bad={ bad }
            />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)