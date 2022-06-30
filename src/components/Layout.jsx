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
  ActionIcon,
} from "@mantine/core";

import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";

import { Logout, Home, User } from "tabler-icons-react";

function Layout({ children }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const { isAuthenticated, logout, user } = useContext(SessionContext);
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
          width={{ sm: 120, lg: 180 }}
        >
          <Anchor
            component={NavLink}
            to="/decision-form"
            style={({ isActive }) =>
              isActive ? { color: "tomato" } : undefined
            }
          >
            New decision
          </Anchor>
          <Anchor
            component={NavLink}
            to="/decisions"
            style={({ isActive }) =>
              isActive ? { color: "tomato" } : undefined
            }
          >
            All decisions
          </Anchor>
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          An <a href="https://github.com/EricCompanyV/">Eric</a> &{" "}
          <a href="https://github.com/ickejohannes/">Johannes</a> Production,
          Ⓒ2022
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
            <ActionIcon component={NavLink} to="/" >
              <Home style={{}} size={32} strokeWidth={2} color={"black"} />
            </ActionIcon>
            {!isAuthenticated ? (
              <div
                id="header-links"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Anchor
                  styles={{ margin: "100px" }}
                  component={NavLink}
                  to="/signup"
                  style={({ isActive }) =>
                    isActive ? { color: "blue" } : { color: "black" }
                  }
                >
                  Signup
                </Anchor>
                <Anchor
                  component={NavLink}
                  to="/login"
                  style={({ isActive }) =>
                    isActive ? { color: "blue" } : { color: "black" }
                  }
                >
                  Login
                </Anchor>
              </div>
            ) : (
              <div
                id="header-links"
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <ActionIcon
                  component={NavLink}
                  to={`/decisions/user/${user._id}`}
                >
                  <User size={26} strokeWidth={2} color={"black"} />
                </ActionIcon>
                <ActionIcon component={NavLink} to="/" onClick={logout}>
                  <Logout size={26} strokeWidth={2} color={"black"} />
                </ActionIcon>
              </div>
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
