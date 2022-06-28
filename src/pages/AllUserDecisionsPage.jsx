import React, { useEffect, useState, useContext } from "react";
import { BASE_API_URL } from "../utils/constants";
import {  useParams } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { Anchor } from "@mantine/core";

import { SessionContext } from "../contexts/SessionContext";

function AllUserDecisionsPage(props) {
  const [userDecisions, setUserDecisions] = useState([]);
  const { token } = useContext(SessionContext);
  const {userId} = useParams()

  const fetchDecisions = async () => {
    const response = await fetch(`${BASE_API_URL}/api/decisions/user/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseParsed = await response.json()
    console.log(responseParsed)
    setUserDecisions(responseParsed.decisionArray);
  };

  useEffect(() => {
    fetchDecisions();
  }, []);

  return (
    <div>
      {userDecisions?.map((decision) => {
                return (
                    <div key={decision._id}>
                        <Anchor
                            component={NavLink}
                            to={`/decisions/${decision._id}`}
                        >
                            {decision.name}
                        </Anchor>
                        <p> Final result is:{decision.result ? decision.options[0]: decision.options[1]}</p>
                    </div>
                )
            })}
    </div>
  );
}

export default AllUserDecisionsPage;
