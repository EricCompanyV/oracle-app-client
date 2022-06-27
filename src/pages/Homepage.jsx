import { Box, Button, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { ThumbDown, ThumbUp } from "tabler-icons-react";

function Homepage() {
  return (
    <>
      <Text>
        Welcome to the first day of your life. Would you like to decide
        something today?
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
