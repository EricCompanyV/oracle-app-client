import { useForm } from "@mantine/form";
import { Button, Input, InputWrapper, MultiSelect, RadioGroup, Radio } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

function NewDecisionForm() {
  const [formStep, setFormStep] = useState(1)
  const [decisionData, setDecisionData] = useState({
    name: "",
    description: "",
    options: [],
    criteria: [],
    result: undefined,
    isPublic: false,
  })

  console.log(decisionData);

  const handleSubmit = () => {
    setFormStep(formStep + 1);
  }

  const handleNameInput = event => {
    let updatedValue = {}
    updatedValue = { name: event.target.value }
    setDecisionData(decisionData => ({
      ...decisionData, ...updatedValue
    }))
  }

  const formStep1 = (
    <form onSubmit={handleSubmit}>
      <InputWrapper
      required
      label="Name"
      description="The name of the new decision"
      >
        <Input 
          type="text"
          name="name"
          value={decisionData.name}
          onChange={handleNameInput}
        />
      </InputWrapper>
      <Button type="submit">Submit</Button>
    </form>
  )
  
  const formStep2 = (
    <h1>Hi there you are currently on step 2</h1>
  )


  switch (formStep) {
    case 1:
      return formStep1
    case 2:
      return formStep2
    default:
      break;
  }
}





/* function NewDecisionForm() {
  const [dataOptions, setDataOptions] = useState([]);
  const [dataCriteria, setDataCriteria] = useState([]);
  const [weights, setWeights] = useState([]);
  const [dataOptionByCriterium, setDataOptionByCriterium] = useState([]);

  

  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      options: [],
      criterium: [],
      author: "",
    },
  });

  const handleSubmit = (values) => {
    console.log(values)
    try {
      if (values.options.length < 2) {
        throw new Error("You need to input 2 options");
      }
      navigate("/signup")
    } catch (error) {
        console.log(error)
        form.setErrors({options: error})
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <InputWrapper
          required
          label="Name"
          description="The name of the new decision"
        >
          <Input {...form.getInputProps("name")} />
        </InputWrapper>
        <InputWrapper
          required
          label="Description"
          description="The description of the new decision"
        >
          <Input {...form.getInputProps("description")} />
        </InputWrapper>
        <MultiSelect
          label="Options to decide"
          data={dataOptions}
          required
          placeholder="e.g. Living in the city vs in countryside"
          searchable
          creatable
          maxSelectedValues={2}
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => {
            let newDataOptions = []
            newDataOptions = [...dataOptions,query]
            setDataOptions((current) => [...current, query])
            console.log(newDataOptions, query)
          }}
          onChange={(event) => console.log(event)}
          {...form.getInputProps("options")}
        />
        <MultiSelect
          label="Which criteria you want to apply"
          data={dataCriteria}
          required
          placeholder="Noise, pollution, access to services..."
          searchable
          creatable
          maxSelectedValues={7}
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) =>
            setDataCriteria((current) => [...current, query])
          }
          {...form.getInputProps("criterium")}
        />
        {dataCriteria.map((criterium, index) => {
          return (
            <div>
              <p key={criterium}>Please attach a weight to this criterium: {criterium}</p>
              <RadioGroup
                value={weights[index]}
                onChange={setWeights[index]}
                required
              >
                <Radio value={3} label="Very important" />
                <Radio value={2} label="So/so" />
                <Radio value={1} label="Not so important" />
              </RadioGroup>
            </div>
          )
        })}
        {dataCriteria.map((criterium, index) => {
          return (
            <div>
              <p>When you consider {criterium}: Which option is preferable?</p>
              <RadioGroup>
                value={dataOptionByCriterium[index]}
                onChange={setDataOptionByCriterium[index]}
                <Radio value="1" label={dataOptions[0]} />
                <Radio value="2" label={dataOptions[1]} />
              </RadioGroup>
            </div>
            
          )
        })}
        <Button type="submit">Make the choice</Button>
      </form>
    </>
  );
} */

export default NewDecisionForm;
