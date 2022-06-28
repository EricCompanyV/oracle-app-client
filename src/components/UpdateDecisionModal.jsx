import { Button, Input, InputWrapper, Modal, NumberInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect } from 'react'

const UpdateDecisionModal = ({ isModalOpen, setIsModalOpen, decisionId, decision, setNeedRefresh }) => {
  console.log("decision passed to the update modal",decision)
  const form = useForm({
    initialValues: {
        name: '',
        description: '',
        options: [],
        criteria: []
    },
  })

  console.log(form)

  const updateDecision = async newValues => {
    await fetch(`http://localhost:5005/decisions/${decisionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newValues),
    })
    setNeedRefresh(true)
    setIsModalOpen(false)
  }

  const handleSubmit = values => {
    updateDecision(values)
  }

  return (
    <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title='Update decision'>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <InputWrapper required label='Name' description='The name of the decision'>
            <Input {...form.getInputProps('name')} />
        </InputWrapper>
        <InputWrapper required label='Description' description='The description of the decision'>
            <Input {...form.getInputProps('description')} />
        </InputWrapper>
        <InputWrapper required label='Options' description='The options'>
                  {/*how does it work for the options, ie an array?*/}
        </InputWrapper>
        <InputWrapper required label='Options' description='criteria'>
            <Input {...form.getInputProps('criteria')} />
            {/*how does it work the critera? We have to show criteria name, weight and preferred option*/}
        </InputWrapper>
        <Button type='submit'>Update decision</Button>
      </form>
    </Modal>
  )
}

export default UpdateDecisionModal
