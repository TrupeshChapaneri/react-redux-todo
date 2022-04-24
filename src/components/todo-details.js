import React, { useEffect } from "react";
import { Box, Button, Typography, TextField } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { removeDoubleQuotes } from "utils/utils";
import { joiResolver } from "@hookform/resolvers";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  updateTodo,
  clearSingleTodo,
} from "redux/actions/todo-action";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { todoSchema } from "validations/todo.schema";

/**
 * @component
 * @example
 * <TodoDetails {...{ setShowTodoDetail }} />
 */

function TodoDetails({ setShowTodoDetail }) {
  const history = useHistory();
  const { id: editId } = useParams();
  const dispatch = useDispatch();

  const { singleTodo = {} } = useSelector((state) => state.todoReducer);

  const { handleSubmit, errors, control, reset } = useForm({
    mode: "onTouched",
    shouldFocusError: true,
    reValidateMode: "onChange",
    submitFocusError: true,
    shouldUnregister: false,
    resolver: joiResolver(todoSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (singleTodo?.id) {
      reset({
        title: singleTodo.title,
        description: singleTodo.description,
      });
    }
  }, [singleTodo, reset]);

  useEffect(() => {
    if (editId) {
      return () => {
        dispatch(clearSingleTodo());
      };
    }
  }, [dispatch, editId]);

  const submitTodo = (data) => {
    if (editId) {
      const payload = {
        ...data,
        id: editId,
        isEdited: true,
      };
      history.push("/todo");
      dispatch(updateTodo(payload));
      toast("Todo Updated");
      return;
    }

    if (!editId) {
      const payload = {
        ...data,
        id: uuidv4(),
        isEdited: false,
        isCompleted: false,
      };
      setShowTodoDetail(false);
      dispatch(addTodo(payload));
      toast("Todo Added");
      return;
    }
  };

  return (
    <>
      <Box className="d-flex list-head">
        <Typography variant="h6" component="div">
          {editId ? "Update" : "Add"} Todo
        </Typography>
        <div>
          <Button
            style={{ margin: "0 20px" }}
            variant="outlined"
            onClick={() => {
              if (editId) {
                history.push("/todo");
              } else {
                setShowTodoDetail(false);
              }
            }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit(submitTodo)}
          >
            {editId ? "Update" : "Add"} Todo
          </Button>
        </div>
      </Box>
      <form className="form-detail">
        <Controller
          control={control}
          name="title"
          render={({ onChange, value, onBlur }) => (
            <TextField
              label="Enter Todo Title"
              required
              multiline
              fullWidth
              onBlur={onBlur}
              error={errors.title}
              variant="outlined"
              helperText={
                errors.title && removeDoubleQuotes(errors.title.message)
              }
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ onChange, value, onBlur }) => (
            <TextField
              label="Enter Todo Description"
              required
              fullWidth
              multiline
              minRows={6}
              onBlur={onBlur}
              error={errors.description}
              variant="outlined"
              helperText={
                errors.description &&
                removeDoubleQuotes(errors.description.message)
              }
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          )}
        />
      </form>
    </>
  );
}

TodoDetails.prototype = {
  setShowTodoDetail: PropTypes.func.isRequired,
};

export { TodoDetails };
