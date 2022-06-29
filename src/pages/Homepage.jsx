import { Box, Button, Text } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ThumbDown, ThumbUp } from "tabler-icons-react";

function Homepage() {
  const [text, setText] = useState("Welcome to the first day of your life. Would you like to decide something today?");

  const changeText = () => {
    setText("You just did. Would you like to take another one?");
  }

  return (
    <>
      <Text>
        {text}
      </Text>
      <Box>
        <Button
          component={Link}
          to={`/decision-form`}
          leftIcon={<ThumbUp size={24} strokeWidth={2} color={"white"} />}
          styles={(theme) => ({
            root: {
              backgroundColor: "#00acee",
              border: 0,
              height: 42,
              paddingLeft: 20,
              paddingRight: 20,

              "&:hover": {
                backgroundColor: theme.fn.darken("#00acee", 0.05),
              },
            },

            leftIcon: {
              marginRight: 15,
            },
          })}
        >
          Yes
        </Button>
        <Button
          component={Link}
          to={`/`}
          onClick={changeText}
          leftIcon={<ThumbDown size={24} strokeWidth={2} color={"white"} />}
          styles={(theme) => ({
            root: {
              backgroundColor: "#00acee",
              border: 0,
              height: 42,
              paddingLeft: 20,
              paddingRight: 20,
              margin: 5,

              "&:hover": {
                backgroundColor: theme.fn.darken("#00acee", 0.05),
              },
            },

            leftIcon: {
              marginRight: 15,
            },
          })}
        >
          No
        </Button>
      </Box>
    </>
  );
}

export default Homepage;
