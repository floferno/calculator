import Wrapper from './components/Wrapper'
import Screen from './components/Screen'
import ButtonBox from './components/ButtonBox'
import React, { useEffect, useState } from 'react'

const operators = ["AC", "/", "x", "+", "-", "="];

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function App() {
  const [input, setInput] = useState("0")
  const [output, setOutput] = useState("")
  const [calculatorData, setCalculatorData] = useState("")

  const handleSubmit = () => {
    console.log({ calculatorData });
    const total = eval(calculatorData)
    setInput(total)
    setOutput(`${calculatorData} = ${total}`);
    setCalculatorData(`${total}`)
  }

  const handleClear = () => {
    setInput("0")
    setOutput("")
    setCalculatorData("")
  }

  const dotOperator = () => {
    const lastChar = calculatorData.charAt(calculatorData.length - 1)
    if (!calculatorData.length) {
      setInput("0.")
      setCalculatorData("0.")
      setOutput("0.")
    } else {
      if (lastChar === "*" || operators.includes(lastChar)) {
        setInput("0.")
        setCalculatorData(`${calculatorData} 0.`)
        setOutput("0.")
      } else {
        setInput(lastChar === "." || input.includes(".") ? `${input}` : `${input}.`);
        let formattedValue = lastChar === "." || input.includes(".") ? `${calculatorData}` : `${calculatorData}.`
        setCalculatorData(formattedValue)
        setOutput(formattedValue)
      }
    }
  }

  const handleOperators = (value) => {
    if (calculatorData.length) {
      setInput(`${value}`)
      const beforeLastChar = calculatorData.charAt(calculatorData.length - 2)

      const beforeLastCharIsOperator = operators.includes(beforeLastChar || beforeLastChar === "*")

      const lastChar = calculatorData.charAt(calculatorData.length - 1)
      const lastCharIsOperator = operators.includes(lastChar) || lastChar === "*"

      const validOp = value === "x" ? "*" : value
      if ((lastCharIsOperator && value !== "-") || beforeLastCharIsOperator && lastCharIsOperator) {
        if (beforeLastCharIsOperator) {
          const updatedValue = `${calculatorData.substring(0, calculatorData.length - 2)}${value}`
          setCalculatorData(updatedValue)
          setOutput(updatedValue)
        } else {
          setCalculatorData(`${calculatorData.substring(0, calculatorData.length - 1)}${validOp}`)
          setOutput(`${calculatorData.substring(0, calculatorData.length - 1)}${validOp}`)

        }
      } else {
        setCalculatorData(`${calculatorData}${validOp}`)
        setOutput(`${calculatorData}${validOp}`);
      }
    }
  }

  const handleNumbers = (value) => {
    if (!calculatorData.length) {
      setInput(`${value}`)
      setCalculatorData(`${value}`)
      setOutput(`${value}`);
    } else {
      if (value === 0 && (calculatorData === "0" || input === "0")) {
        setCalculatorData(`${calculatorData}`)
        setOutput(`${calculatorData}`);
      } else {
        const lastChar = calculatorData.charAt(calculatorData.length - 1)
        const isLastCharOperator = lastChar === "*" || operators.includes(lastChar)

        setInput(isLastCharOperator ? `${value}` : `${input}${value}`)
        setCalculatorData(`${calculatorData}${value}`)
        setOutput(`${calculatorData}${value}`);
      }
    }
  }

  const handleInput = (value) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);

    switch (value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case number:
        handleNumbers(value);
        break;
      case ".":
        dotOperator();
        break;
      case operator:
        handleOperators(value);
        break;
      default:
        break;
    }
  }
  const handleOutput = () => {
    setOutput(output)
  }
  useEffect(() => {
    handleOutput()
  }, [calculatorData])

  return (
    <Wrapper>
      <Screen input={input} output={output} />
      <ButtonBox handleInput={handleInput} />
    </Wrapper>
  );
}

export default App;
