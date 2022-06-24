import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Anchor,
  ActionIcon
} from "@mantine/core";

import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";

import { Logout } from 'tabler-icons-react'

function Layout({ children }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const { isAuthenticated, logout } = useContext(SessionContext);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Text>Application navbar</Text>
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header height={70} p="md" align="center">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>{" "}
            <Anchor
              component={NavLink}
              to="/signup"
              style={({ isActive }) =>
                isActive ? { color: "blue" } : { color: "black" }
              }
            >
              Signup
            </Anchor>
            {isAuthenticated ? (
                <ActionIcon onClick={logout}>
                <Logout size={48} strokeWidth={2} color={'black'} />
              </ActionIcon>
            ) : (
              <Anchor
                component={NavLink}
                to="/login"
                style={({ isActive }) =>
                  isActive ? { color: "blue" } : { color: "black" }
                }
              >
                Login
              </Anchor>
            )}
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}

export default Layout;
