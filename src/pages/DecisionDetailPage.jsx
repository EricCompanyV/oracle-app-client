import { Text } from '@mantine/core'
import { useContext } from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'


function DecisionDetailPage(props) {
    const { decisionId } = useParams()
   
      
    const { apiWithToken } = useContext(SessionContext)

    const [decision, setDecision] = useState({})

    const fetchDecision = async () => {
        const response = await apiWithToken(`decisions/${decisionId}`)
        setDecision(response)
    }
    
    useEffect(() => {
        fetchDecision()
      }, [])

    return (
        <div>
            <Text>{decision.name}</Text>
            <Text>{decision.options}</Text>
            <Text>{decision.criteria}</Text>
            <Text>{decision.result}</Text>
            <Text>{decision.isPublic}</Text>
        </div>
    );
}

export default DecisionDetailPage;