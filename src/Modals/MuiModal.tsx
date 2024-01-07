import { Modal, Button, TextareaAutosize } from "@mui/material";
import { useState } from "react";

interface IProps {
    open: boolean;
    handleClose: () => void;
    handlePostComment: (comment: string) => void;
    initialComment?: string
}

const MaterialUIModal: React.FC<IProps> = ({ open, handleClose, handlePostComment, initialComment }) => {
    const [comment, setComment] = useState(initialComment || '');

    const handlePost = () => {
        handlePostComment(comment);
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <div className="myModal" style={{ padding: '10%', width: '300px', background: '#fff'}}>
                <TextareaAutosize
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder=" Enter Your Comment..."
                    style={{ width: '100%', height: '100px' }}
                    className="textArea"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePost}
                    style={{ marginTop: '10px' }}
                >
                    Post With Comment
                </Button>
            </div>

        </Modal>
    );
};

export default MaterialUIModal;