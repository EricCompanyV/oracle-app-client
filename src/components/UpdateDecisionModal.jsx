import { Button, Input, InputWrapper, Modal, NumberInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect } from 'react'

const UpdateDecisionModal = ({ isModalOpen, setIsModalOpen, decisionId, decision, setNeedRefresh }) => {
  const form = useForm({
    initialValues: {
        name: '',
        description: '',
        options: [],
        criteria: []
    },
  })


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
        <Button type='submit'>Update decision</Button>
      </form>
    </Modal>
  )
}

export default UpdateDecisionModal
