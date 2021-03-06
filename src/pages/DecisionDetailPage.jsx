import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Input,
  InputWrapper,
  Text,
  Title,
} from "@mantine/core";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UpdateDecisionModal from "../components/UpdateDecisionModal";
import { SessionContext } from "../contexts/SessionContext";
import { createNewComment } from "../utils/helper";
import { Pencil, Trash } from "tabler-icons-react";
import { BASE_API_URL } from "../utils/constants";

function DecisionDetailPage(props) {
  const { decisionId } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(SessionContext);
  const { user } = useContext(SessionContext);

  const [decision, setDecision] = useState({
    options: [],
    criteria: [{ name: "", weight: 1, option: 1 }],
  });
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);

  const fetchDecision = async () => {
    const response = await fetch(
      `${BASE_API_URL}/api/decisions/${decisionId}`,
      {
        method: "GET",
      }
    );
    const responseParsed = await response.json();
    setDecision(responseParsed.decision);
    setComments(responseParsed.commentsOnDecision);
  };

  useEffect(() => {
    fetchDecision();
  }, []);

  useEffect(() => {
    if (needRefresh) {
      fetchDecision();
      setNeedRefresh(false);
    }
  }, [needRefresh]);

  const handleInput = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault()
    console.log(event);
    createNewComment(comment, decisionId, token);
    setComment("")
    setNeedRefresh(true);
  };

  const deleteDecision = async () => {
    await fetch(`${BASE_API_URL}/api/decisions/${decisionId}`, {
      method: "DELETE",
    });
    navigate("/decisions");
  };

  const deleteComment = async (id) => {
    await fetch(`${BASE_API_URL}/api/comments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNeedRefresh(true);
  };

  return (
    <div>
      <Card
        shadow='sm'
        p='xl'
        withBorder
        sx={{
          '&:hover': {
              backgroundColor: '#EEEEEE',
          },
        marginTop: 10,
        marginBottom: 10
        }}>
        <Title order={1}>The decision: {decision.name}</Title>
        <Divider></Divider>
        <Text>The description: {decision.description}</Text>
        <Divider></Divider>
        <Text>
          The options: <br />
          {decision.options[0]} <br />
          {decision.options[1]} <br />
        </Text>
        <Divider></Divider>
        <Text>
          The criteria, the weights and which option they were counted for: <br />
          {decision.criteria.map((criterium, index) => {
            if (criterium.name) {
              return (
                <Text>
                  Criterium {criterium.name} with a weight of {criterium.weight}{" "}
                  was counted for option {criterium.option}
                </Text>
              );
            }
          })}
        </Text>
        <Divider></Divider>
        <Text>
          The result:{" "}
          {decision.result ? decision.options[0] : decision.options[1]}
        </Text>
        <Divider></Divider>
        {user._id && user._id === decision.author ? (
          <div>
            <ActionIcon onClick={() => setIsModalOpen(true)}>
              <Pencil size={48} strokeWidth={2} color={"blue"} />
            </ActionIcon>
            <ActionIcon onClick={deleteDecision}>
              <Trash size={48} strokeWidth={2} color={"#bf4058"} />
            </ActionIcon>
          </div>
        ) : (
          <div></div>
        )}
      </Card>

      {comments?.map((comment) => (
        <Card
          shadow='sm'
          p='xl'
          withBorder
          sx={{
            '&:hover': {
                backgroundColor: '#EEEEEE',
            },
          marginTop: 10,
          marginBottom: 10
        }}>
          <Text key={comment.content}>
            {comment.content + " by " + comment.author.username}
          </Text>
          {comment.author._id === user._id ? (
            <ActionIcon onClick={() => deleteComment(comment._id)}>
              <Trash size={48} strokeWidth={2} color={"#bf4058"} />
            </ActionIcon>
          ) : (
            <></>
          )}
        </Card>
      ))}
      <form onSubmit={handleCommentSubmit}>
        <InputWrapper label="You can add a comment here">
          <Input required value={comment} onChange={handleInput} />
        </InputWrapper>
        <Button type="submit">Submit</Button>
      </form>
      {isModalOpen && (
        <UpdateDecisionModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          decisionId={decisionId}
          decision={decision}
          setNeedRefresh={setNeedRefresh}
        />
      )}
    </div>
  );
}

export default DecisionDetailPage;
