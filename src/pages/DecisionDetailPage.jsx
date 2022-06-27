import { Button, Input, InputWrapper, Text } from '@mantine/core'
import { useContext } from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'
import { createNewComment } from '../utils/helper'


function DecisionDetailPage(props) {
    const { decisionId } = useParams();
   
      
    const { apiWithToken } = useContext(SessionContext);

    const [decision, setDecision] = useState({});
    const { comments, setComments } = useState({});
    const [comment, setComment] = useState("")

    const fetchDecision = async () => {
        const response = await apiWithToken(`decisions/${decisionId}`);
        setDecision(response);
    }

    const fetchComments = async () => {
        const response = await apiWithToken(`comments/${decisionId}`);
        setComments(response);
    }
    
    useEffect(() => {
        fetchDecision()
        fetchComments()
    }, [])
    
    const handleInput = event => {
        setComment(event.target.value);
    }
    
    const handleSubmit = event => {
        event.preventDefault()
        createNewComment(comment)
    }

    return (
        <div>
            <Text>{decision.name}</Text>
            <Text>{decision.options}</Text>
            <Text>{decision.criteria}</Text>
            <Text>{decision.result}</Text>
            <Text>{decision.isPublic}</Text>
            {/*If decision belongs to logged in user show edit and delete buttons}
            Show comments here
            If comment belongs to logged in user show delete comment button
            Show input for comment here if decision does not belong to logged in user*/}
            {comments.map((comment) => {
                // maybe show username of person who wrote comment here too 
                return <Text>{comment.content}</Text>
            })}
            <form onSubmit={handleSubmit}>
                <InputWrapper
                    label="You can add a comment here"
                >
                    <Input
                    required
                    type="text"
                    name="name"
                    value={comment}
                    onChange={handleInput}
                    />
                </InputWrapper>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
}

export default DecisionDetailPage;