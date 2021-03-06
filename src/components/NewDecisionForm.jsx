import { useForm } from "@mantine/form";
import { Button, Input, InputWrapper, MultiSelect, RadioGroup, Radio, SegmentedControl } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { createNewDecision } from "../utils/helper";
import { SessionContext } from '../contexts/SessionContext'
import { useContext } from 'react'

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
  const { token, isAuthenticated } = useContext(SessionContext);

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
      <Button style={{marginTop: 10, marginRight: 20}} type="submit" onClick={()=> {
        navigate("/signup", {decisionData})
      }}>Go to Signup</Button>
    )
  }

  const resetNewDecisionForm = () => {
    setFormStep(1);
    setDecisionData({
      name: "",
      description: "",
      options: ["", ""],
      criteria: [{}, {}, {}, {}, {}, {}, {}],
      result: undefined,
      isPublic: false,
    })
  }

  const displayNewDecisionButton = () => {
    return (
      <Button
        type="button"
        onClick={resetNewDecisionForm}
      >
        Make another decision
      </Button>
    )
  }

  const handlePartialSubmit = (event) => {
    event.preventDefault()
    setFormStep(formStep + 1);
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
      return "";
    })


    if (pointsForOption2 > pointsForOption1) {
      decision = false;
    }
    setDecisionData(previousState => {
      let newState = structuredClone(previousState);
      newState.result = decision;
      createNewDecision(newState, token);
      return newState;
    })
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
    let newDecisionData = structuredClone(decisionData);
    newDecisionData.criteria[event.target.name].name = event.target.value;
    newDecisionData.criteria[event.target.name].option = "";
    setDecisionData(newDecisionData)
  }

  const handleWeightInput = event => {
    let newDecisionData = structuredClone(decisionData);
    newDecisionData.criteria[event.target.name].weight = event.target.value;
    setDecisionData(newDecisionData);
  }

  const handlePreferencesInput = event => {
    let newDecisionData = structuredClone(decisionData);
    newDecisionData.criteria[event.target.name].option = event.target.value;
    setDecisionData(newDecisionData);
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
      <Button style={{marginTop: 10}} type="submit">Submit</Button>
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
      <Button style={{marginTop: 10}} type="submit">Submit</Button>
    </form>
  )

  const formStep3 = (
    <form onSubmit={handlePartialSubmit}>
      <InputWrapper
        label="The Possibilities"
        description="Enter your possible courses of action."
      >
        <Input
          required
          type="text"
          name="0"
          value={decisionData.options[0]}
          onChange={handleOptionsInput}
        />
        <Input
        style={{marginTop:10}}
          required
          type="text"
          name="1"
          value={decisionData.options[1]}
          onChange={handleOptionsInput}
        />
      </InputWrapper>
      <Button style={{marginTop: 10}} type="submit">Submit</Button>
    </form>
  )

  const formStep4 = (
    <form onSubmit={handlePartialSubmit}>
      <InputWrapper
        label="The Criteria"
        description="Enter up to seven criteria for this decision. A minimum of two criteria is necessary for this to make any sense."
      >
        {decisionData.criteria.map((criterium, index) => {
          // Make first two inputs required
          if (index < 2) {
            return (
              <Input
              style={{marginTop:5}}
                key={index}
                type="text"
                name={index}
                value={decisionData.criteria[index].name}
                onChange={handleCriteriaInput}
                required
              />
            )
          } else {
            return (
              <Input
              style={{marginTop:5}}
                key={index}
                type="text"
                name={index}
                value={decisionData.criteria[index].name}
                onChange={handleCriteriaInput}
              />
            )
          }
        })}
      </InputWrapper>
      <Button style={{marginTop: 10}} type="submit">Submit</Button>
    </form>
  )
  
  const formStep5 = (
    <form onSubmit={handlePartialSubmit}>
      <InputWrapper
        label="The Weights"
        description="How important are these criteria to you? Enter a number between 1 and 10, where 10 is of the utmost importance."
      >
        {decisionData.criteria.map((criterium, index) => {
          if (criterium.name) {
            return (
              <InputWrapper
                label={criterium.name}
                key={index}
              >
                <Input
                  type="number"
                  name={index}
                  value={decisionData.criteria[index].weight}
                  onChange={handleWeightInput}
                  min="1"
                  max="10"
                  step="1"
                  required
                />
              </InputWrapper>
            )
          }
        })}
      </InputWrapper>
      <Button style={{marginTop: 10}} type="submit">Submit</Button>
    </form>
  )

  const formStep6 = (
    <form onSubmit={handlePartialSubmit}>
      <InputWrapper
        label="The Preferences"
        description={"Please enter 1 if the option " + decisionData.options[0] + " is preferable in terms of any of your criteria, 2 if " + decisionData.options[1] + " is preferable."}
      >
        {decisionData.criteria.map((criterium, index) => {
          if (criterium.name) {
            return (
              <InputWrapper
                label={decisionData.criteria[index].name}
                key={index}
              >
                <Input
                  type="number"
                  name={index}
                  value={decisionData.criteria[index].option}
                  onChange={handlePreferencesInput}
                  min="1"
                  max="2"
                  step="1"
                  required
                />
              </InputWrapper>
            )
          }
        })}
      </InputWrapper>
      <Button style={{marginTop: 10}} type="submit">Submit</Button>
    </form>
  )

  const formStep7 = (
    <div>
      <p>You told me everything I need to know. Are you ready to decide?</p>
      <Button style={{marginTop: 10}} type="submit" onClick={handleFinalSubmit}>Yes</Button>
    </div>
  )

  const formStep8 = (
    <div>
      {displayResult()} 
      {!isAuthenticated && (
        displaySignupButton()
      ) }
      {displayNewDecisionButton()}
    </div>
  )

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
      return formStep8
    default:
      break;
  }
}

export default NewDecisionForm;
