import { ActionIcon, Button, Input, InputWrapper, Text } from "@mantine/core";
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


  const [decision, setDecision] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);

  const fetchDecision = async () => {
    console.log("fecthing detail on a decision");
    const response = await fetch(
      `${BASE_API_URL}/api/decisions/${decisionId}`,
      {
        method: "GET",
      }
    );
    console.log(response)
    const responseParsed = await response.json();
    console.log("------->",responseParsed);
    setDecision(responseParsed);
    setComments(responseParsed.commentsOnDecision)
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
    event.preventDefault();
    console.log("comment:", {comment})
    createNewComment(comment, decisionId, token);
    setNeedRefresh(true)
  };

  const deleteDecision = async () => {
    await fetch(
        `${BASE_API_URL}/api/decisions/${decisionId}`, {
      method: "DELETE",
    });
    navigate("/decisions");
  };

  return (
    <div>
      <Text>{decision.name}</Text>
      <Text>{decision.options}</Text>
      <Text>{decision.criteria}</Text>
      <Text>{decision.result}</Text>
      <Text>{decision.isPublic}</Text>
      <ActionIcon onClick={() => setIsModalOpen(true)}>
        <Pencil size={48} strokeWidth={2} color={"blue"} />
      </ActionIcon>
      <ActionIcon onClick={deleteDecision}>
        <Trash size={48} strokeWidth={2} color={"#bf4058"} />
      </ActionIcon>
      {/*If decision belongs to logged in user show edit and delete buttons}
            Show comments here
            If comment belongs to logged in user show delete comment button
            Show input for comment here if decision does not belong to logged in user*/}
      {comments.map((comment) => (
        // maybe show username of person who wrote comment here too
        <Text>{comment.content}</Text>
      ))}
      <form onSubmit={handleCommentSubmit}>
        <InputWrapper label="You can add a comment here">
          <Input
            required
            value={comment}
            onChange={handleInput}
          />
        </InputWrapper>
        <Button type="submit">Submit</Button>
      </form>
      <UpdateDecisionModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        decisionId={decisionId}
        decision={decision}
        setNeedRefresh={setNeedRefresh}
      />
    </div>
  );
}

export default DecisionDetailPage;
