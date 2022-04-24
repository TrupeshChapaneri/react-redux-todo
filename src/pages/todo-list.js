import React, { useEffect, useState } from "react";
import {
  TableHead,
  TableContainer,
  TableRow,
  Table,
  TableBody,
  TableCell,
  Zoom,
  Typography,
  Tooltip,
  Card,
  CardContent,
  Button,
  Box,
  IconButton,
  Divider,
  Toolbar,
  Checkbox,
  Switch,
  TableSortLabel,
  TablePagination,
} from "@material-ui/core";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { useHistory } from "react-router-dom";
import { TodoDetails } from "components/todo-details";
import { useDispatch, useSelector } from "react-redux";
import { ConformationModal } from "components/conformation-modal";
import {
  deleteTodo,
  getSingleTodo,
  getTodoList,
  titleSortAsc,
  titleSortDesc,
  updateTodoIsCompleted,
} from "redux/actions/todo-action";
import { toast } from "react-toastify";

function TodoList() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { todoList = [] } = useSelector((state) => state.todoReducer);

  const [showTodoDetail, setShowTodoDetail] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [todoIds, setTodoIds] = useState([]);
  const [titleSortingtype, setTitleingtype] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  useEffect(() => {
    dispatch(getTodoList());
  }, [dispatch]);

  if (showTodoDetail) {
    return <TodoDetails {...{ setShowTodoDetail }} />;
  }

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      setTodoIds(todoList.map((n) => n.id));
      return;
    }
    setTodoIds([]);
  };

  const handleClick = (e, name) => {
    const selectedIndex = todoIds.indexOf(name);
    let newTodoIds = [];

    if (selectedIndex === -1) {
      newTodoIds = newTodoIds.concat(todoIds, name);
    } else if (selectedIndex === 0) {
      newTodoIds = newTodoIds.concat(todoIds.slice(1));
    } else if (selectedIndex === todoIds.length - 1) {
      newTodoIds = newTodoIds.concat(todoIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newTodoIds = newTodoIds.concat(
        todoIds.slice(0, selectedIndex),
        todoIds.slice(selectedIndex + 1)
      );
    }

    setTodoIds(newTodoIds);
  };

  const getTableData = () => {
    if (todoList.length === 0) {
      return (
        <TableRow hover>
          <TableCell className="empty-table" colSpan="5">
            No Todos found
          </TableCell>
        </TableRow>
      );
    }
    return (
      rowsPerPage > 0
        ? todoList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : todoList
    ).map(({ id, title, description, isEdited, isCompleted }, index) => (
      <TableRow
        hover
        key={id}
        onClick={() => {
          if (isCompleted) {
            toast("Can't Update Completed Todo");
            return;
          }
          history.push(`/todo/${id}`);
          dispatch(getSingleTodo(id));
        }}
      >
        <TableCell>
          <Checkbox
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              handleClick(e, id);
            }}
            selected={todoIds.indexOf(id) !== -1}
            checked={todoIds.indexOf(id) !== -1}
          />
        </TableCell>
        <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
        <TableCell className={`edite-icon ${isCompleted && "cross-line"}`}>
          {title}
          {isEdited && (
            <Tooltip
              TransitionComponent={Zoom}
              title="Edited Todo"
              placement="top"
            >
              <EditOutlinedIcon fontSize="small" />
            </Tooltip>
          )}
        </TableCell>
        <Tooltip TransitionComponent={Zoom} title={description} placement="top">
          <TableCell>{description}</TableCell>
        </Tooltip>
        <TableCell>
          <Switch
            color="primary"
            checked={isCompleted}
            onClick={(e) => {
              e.stopPropagation();
              toast(`Todo Marked as  ${isCompleted ? "Pending" : "Completed"}`);
              const payload = {
                id,
                isCompleted,
              };
              dispatch(updateTodoIsCompleted(payload));
            }}
          />
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <React.Fragment>
      <Box className="d-flex">
        <Typography variant="h6" component="div">
          Todos <span>({todoList.length})</span>
        </Typography>

        <Button
          color="primary"
          variant="contained"
          onClick={() => setShowTodoDetail(true)}
        >
          Add Todo
        </Button>
      </Box>
      <Card className="tabel-list">
        <Toolbar className="d-flex">
          {todoIds.length > 0 ? (
            <Typography variant="h6" component="div">
              Selected Todo <span>({todoIds.length})</span>
            </Typography>
          ) : (
            <Typography variant="h6" component="div">
              <font>Todo List</font>
            </Typography>
          )}
          {todoIds.length > 0 && (
            <Tooltip
              title="Delete selected Todo"
              onClick={() => setDeleteModal(true)}
            >
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
        <Divider />
        <CardContent style={{ padding: "0" }}>
          <TableContainer>
            <Table size="medium" className="select-table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "80px" }}>
                    <Checkbox
                      style={{ padding: "0 9px" }}
                      color="primary"
                      indeterminate={
                        todoIds.length > 0 && todoIds.length < todoList.length
                      }
                      checked={
                        todoList.length > 0 &&
                        todoIds.length === todoList.length
                      }
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell>#</TableCell>
                  <TableCell sortDirection={false}>
                    <TableSortLabel
                      active={titleSortingtype}
                      direction={titleSortingtype === "asc" ? "desc" : "asc"}
                      onClick={() => {
                        setTitleingtype(
                          titleSortingtype === "asc" ? "desc" : "asc"
                        );
                        if (titleSortingtype === "asc") {
                          dispatch(titleSortAsc());
                          return;
                        }
                        if (titleSortingtype === "desc") {
                          dispatch(titleSortDesc());
                          return;
                        }
                      }}
                    >
                      Title
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell style={{ width: "200px" }}>
                    Complete Todo
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{getTableData()}</TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[3, 5, 10, 20]}
            component="div"
            count={todoList.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(event.target.value);
              setPage(0);
            }}
          />
        </CardContent>
      </Card>

      {deleteModal && (
        <ConformationModal
          onClickYes={() => {
            setDeleteModal(false);
            dispatch(deleteTodo(todoIds));
            setTodoIds([]);
          }}
          isOpen={deleteModal}
          modalHeader="Are you sure you want to Delete Todos"
          onClose={() => setDeleteModal(false)}
        />
      )}
    </React.Fragment>
  );
}

export { TodoList };
