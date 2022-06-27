import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SessionContext } from '../contexts/SessionContext';
import { BASE_API_URL } from '../utils/constants';
import { Anchor } from "@mantine/core";

function AllDecisionsPage(props) {
    const {token} = useContext(SessionContext)
    const [decisions, setDecisions] = useState([])

    const fetchDecisions = async () => {
        console.log("fetching decisions")
        const response = await fetch(`${BASE_API_URL}/api/decisions/`,
        {method: 'GET',headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }})
        const responseParsed = await response.json()
        console.log(responseParsed)
        setDecisions(responseParsed.decisions)
    }
    
    useEffect(() => {
        fetchDecisions()
      }, [])

    return (
        <div>
            These are all the decisions that have been made.
            {decisions.map((decision) => {
                return (
                    <div>
                        <Anchor
                            component={NavLink}
                            to={`/decisions/:${decision._id}`}
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

export default AllDecisionsPage;