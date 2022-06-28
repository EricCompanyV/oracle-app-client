import { Button, Input, InputWrapper, Modal, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { BASE_API_URL } from "../utils/constants";

const UpdateDecisionModal = ({
  isModalOpen,
  setIsModalOpen,
  decisionId,
  decision,
  setNeedRefresh,
}) => {
  console.log(decision)
  
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      options: [],
      criteria: [],
    },
  });

  useEffect(()=>{
    form.setValues({
      name: decision.name,
      description: decision.description,
      options: decision.options,
      criteria: decision.criteria
    })
  },[decision])



  //  const handleWeightInput = (event, id) => {
  //   let newDecision = JSON.parse(JSON.stringify(decision))
  //   console.log("newDecision",newDecision)
  //   for (let i = 0; i <newDecision.criteria.length; ++i) {
  //     if (decision.criteria[i]._id === id) {
  //       console.log(decision.criteria[i]._id)
  //     }
  //   }
  //   form.setFieldValue("criteria",newDecision)

  //  };

   const handlePreferencesInput = (event) => {
     let newCriteriaArray = decision.criteria;
     newCriteriaArray[event.target.name].option = event.target.value;
   };

  const updateDecision = async (newValues) => {
    await fetch(`${BASE_API_URL}/api/decisions/${decisionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newValues),
    });
    setNeedRefresh(true);
    setIsModalOpen(false);
  };

  const handleSubmit = (values) => {
    updateDecision(values);
  };

  return (
    <Modal
      opened={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Update decision"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <InputWrapper
          required
          
          label="Name"
          description="The name of the decision"
          placeholder={123456}
        >
          <Input {...form.getInputProps("name")} />
        </InputWrapper>
        <InputWrapper
          required
          label="Description"
          description="The description of the decision"
        >
          <Input {...form.getInputProps("description")} />
        </InputWrapper>
        {/*decision.criteria.map((criterium, index) => {
          if (criterium.name) {
            return (
              <InputWrapper
                label={
                  decision.criteria[index].name +
                  " (choose weight and preferred option)"
                }
                key={index}
              >
                <NumberInput
                  label="weight assigned to criteria"
                  required
                  value={form.values.criteria[index]?.weight}
                  onChange={()=>{handleWeightInput(criterium._id)}}
                />
                <NumberInput
                  label="option chosen"
                  name={index}
                  value={form.values.criteria[index]?.options}
                  required
                  onChange={handlePreferencesInput}
                />
              </InputWrapper>
            );
          }
        })*/}
        <Button type="submit">Update decision</Button>
      </form>
    </Modal>
  );
};


export default UpdateDecisionModal;
