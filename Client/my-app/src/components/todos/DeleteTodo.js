import React, { useState } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Alert } from "@mui/material";

const DeleteTodo = ({ open, setopen,  payload, onClose,todos,SetTodos }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            console.log(payload)
            await Axios.delete(`http://localhost:1500/api/todo/${payload._id}`);
            SetTodos(todos.filter(item => item._id !== payload._id));
           
            setopen(false)
           // onClose(); // סגירת הדיאלוג אחרי מחיקה מוצלחת
        } catch (e) {
            console.error(e);
            setError(e.response?.data?.message || "Unknown error");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog fullWidth open={open} onClose={onClose}>
           
            <DialogTitle>Are you sure you want to delete "{payload.title}"?</DialogTitle>
            <DialogContent>
                {error && (
                    <Alert severity="error">
                        {`An error occurred while deleting item "${payload.title}":`}
                        <pre>{error}</pre>
                    </Alert>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={isDeleting}>Cancel</Button>
                <Button onClick={handleDelete} color="error" disabled={isDeleting}>
                    {isDeleting ? "Deleting..." : "Delete"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

DeleteTodo.propTypes = {
    open: PropTypes.bool.isRequired,
    model: PropTypes.string.isRequired,
    payload: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        _id: PropTypes.string.isRequired,
    }).isRequired,
    LoudData: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default DeleteTodo;
