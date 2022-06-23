import { useForm } from "@mantine/form";
import { Button, Input, InputWrapper, MultiSelect } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

function NewDecisionForm() {
  const [dataOptions, setDataOptions] = useState([""]);
  const [dataCriteria, setDataCriteria] = useState(["Necessity"]);

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
          onCreate={(query) => setDataOptions((current) => [...current, query])}
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
        <Button type="submit">Create</Button>
      </form>
    </>
  );
}

export default NewDecisionForm;
