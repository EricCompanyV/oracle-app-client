import {
  Box,
  Button,
  TextInput,
  InputWrapper,
  PasswordInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { checkToken, login } from "../utils/helper";

function LoginPage() {
  const { authenticateUser, declareUser, token } = useContext(SessionContext);
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });


  const logUser = async (values) => {
    try {
      const response = await login(values);
      declareUser(response.tempUser);
      if (response.status === "KO") {
        throw new Error(response.message);
      } else {
        authenticateUser(response.token);
      }
    } catch (error) {}
  };

  const handleSubmit = (values) => {
    logUser(values);
  };

  return (
    <Box>
      <Title>Login</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <InputWrapper
          required
          label="Username"
          description="Your unique username"
        >
          <TextInput {...form.getInputProps("username")} />
        </InputWrapper>
        <InputWrapper required label="Password" description="Your password">
          <PasswordInput {...form.getInputProps("password")} />
        </InputWrapper>
        <Button type="submit">Login</Button>
      </form>
    </Box>
  );
}

export default LoginPage;
