import { useForm } from "@mantine/form";
import { Button, Input, InputWrapper, MultiSelect, RadioGroup, Radio, SegmentedControl } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

function NewDecisionForm() {
  const navigate = useNavigate()
  const [formStep, setFormStep] = useState(1)
  const [decisionData, setDecisionData] = useState({
    name: "",
    description: "",
    options: ["", ""],
    criteria: [{}, {}, {}, {}, {}, {}, {}],
    result: undefined,
    isPublic: false,
  })

  console.log(decisionData);

  const handlePartialSubmit = (event) => {
    event.preventDefault()
    setFormStep(formStep + 1);
  }

  const handleFinalSubmit = () => {
    calculateResult();
    setFormStep(formStep + 1);
  }

  const handleInput = event => {
    let updatedValue = {}
    updatedValue = { [event.target.name]: event.target.value }
    setDecisionData(decisionData => ({
      ...decisionData, ...updatedValue
    }))
  }

  const handleOptionsInput = event => {
    let newOptionsArray = decisionData.options
    newOptionsArray[event.target.name] = event.target.value
    setDecisionData(decisionData => ({
      ...decisionData, options: newOptionsArray
    }))
  }

  const handleCriteriaInput = event => {
    let newCriteriaArray = decisionData.criteria
    newCriteriaArray[event.target.name].name = event.target.value
  }

  const handleWeightInput = event => {
    console.log(event.target.value)
    let newCriteriaArray = decisionData.criteria
    newCriteriaArray[event.target.name].weight = event.target.value
  }

  const handlePreferencesInput = event => {
    let newCriteriaArray = decisionData.criteria
    newCriteriaArray[event.target.name].option = event.target.value
  }

  const calculateResult = () => {
    let decision = true;

    let pointsForOption1 = 0;
    let pointsForOption2 = 0;

    decisionData.criteria.map((criterium) => {
      if (criterium.option === "1") {
        pointsForOption1 += parseInt(criterium.weight);
      } else if (criterium.option === "2") {
        pointsForOption2 += parseInt(criterium.weight);
      }
      return
    })

    console.log("Points for option 1:", pointsForOption1, "Points for option 2", pointsForOption2)

    if (pointsForOption2 > pointsForOption1) {
      decision = false;
    }

    setDecisionData(decisionData => ({
      ...decisionData, result: decision
    }))
  }

  const formStep1 = (
    <form onSubmit={handlePartialSubmit}>
      <InputWrapper
        label="The Name"
        description="The name of the new decision"
      >
        <Input
          required
          type="text"
          name="name"
          value={decisionData.name}
          onChange={handleInput}
        />
      </InputWrapper>
      <Button type="submit">Submit</Button>
    </form>
  )
  
  const formStep2 = (
    <form onSubmit={handlePartialSubmit}>
      <InputWrapper
        label="The Description"
        description="If you wish to do so, please describe the decision you're facing."
      >
        <Input
          type="text"
          name="description"
          value={decisionData.description}
          onChange={handleInput}
        />
      </InputWrapper>
      <Button type="submit">Submit</Button>
    </form>
  )

  const formStep3 = (
    <form onSubmit={handlePartialSubmit}>
      <InputWrapper
        label="The Possibilities"
        description="Enter your possible courses of action."
      >
        <Input
          type="text"
          name="0"
          value={decisionData.options[0]}
          onChange={handleOptionsInput}
        />
        <Input
          type="text"
          name="1"
          value={decisionData.options[1]}
          onChange={handleOptionsInput}
        />
      </InputWrapper>
      <Button type="submit">Submit</Button>
    </form>
  )

  const formStep4 = (
    <form onSubmit={handlePartialSubmit}>
      <InputWrapper
        label="The Criteria"
        description="Enter the criteria for this decision."
      >
        {decisionData.criteria.map((criterium, index) => {
          return (
            <Input
              key={index}
              type="text"
              name={index}
              value={decisionData.criteria[index].name}
              onChange={handleCriteriaInput}
            />
          )
        })}
      </InputWrapper>
      <Button type="submit">Submit</Button>
    </form>
  )
  
  const formStep5 = (
    <form onSubmit={handlePartialSubmit}>
      <InputWrapper
        label="The Weights"
        description="How important are these criteria to you? Enter a number between 1 and 10, where 10 is of the utmost importance."
      >
        {decisionData.criteria.map((criterium, index) => {
          return (
            <Input
              key={index}
              type="number"
              name={index}
              value={decisionData.criteria[index].weight}
              onChange={handleWeightInput}
            />
          )
        })}
      </InputWrapper>
      <Button type="submit">Submit</Button>
    </form>
  )

  const formStep6 = (
    <form onSubmit={handlePartialSubmit}>
      <InputWrapper
        label="The Preferences"
        description={"Please enter 1 if the option " + decisionData.options[0] + " is preferable in terms of any of your criteria, 2 if " + decisionData.options[1] + " is preferable."}
      >
        {decisionData.criteria.map((criterium, index) => {
          return (
            <InputWrapper
              label={decisionData.criteria[index].name}
              key={index}
            >
              <Input
                type="text"
                name={index}
                value={decisionData.criteria[index].option}
                onChange={handlePreferencesInput}
              />
            </InputWrapper>
          )
        })}
      </InputWrapper>
      <Button type="submit">Submit</Button>
    </form>
  )

  const formStep7 = (
    <div>
      <p>You told me everything I need to know. Are you ready to decide?</p>
      <Button type="submit" onClick={handleFinalSubmit}>Yes</Button>
    </div>
  )

  function displayResult() {
    if (decisionData.result) {
      return (
        <p>{"You should do " + decisionData.options[0] + "."}</p>
      )
    } else {
      return (
        <p>{"You should do " + decisionData.options[1] + "."}</p>
      )
    }
  }

  function displaySignupButton(){
    return (
      <Button type="submit" onClick={()=> {
        navigate("/signup", {decisionData})
      }}>Go to Signup</Button>
    )
  }


  switch (formStep) {
    case 1:
      return formStep1
    case 2:
      return formStep2
    case 3:
      return formStep3
    case 4:
      return formStep4
    case 5:
      return formStep5
    case 6:
      return formStep6
    case 7:
      return formStep7
    case 8:
      return (
        displayResult(),
        displaySignupButton()
      )
    default:
      break;
  }
}

export default NewDecisionForm;
