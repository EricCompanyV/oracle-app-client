import { Box, Button, Input, InputWrapper, PasswordInput, Title } from '@mantine/core'

function LoginPage() {


    return ( 
        <Box>
          <Title>Login</Title>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <InputWrapper
              required
              label='Username'
              description='Your unique username'
              {...form.getInputProps('username')}
            >
              <Input {...form.getInputProps('username')} />
            </InputWrapper>
            <InputWrapper required label='Password' description='Your password'>
              <PasswordInput {...form.getInputProps('password')} />
            </InputWrapper>
            <Button type='submit'>Login</Button>
          </form>
        </Box>
      )
    } 

export default LoginPage;