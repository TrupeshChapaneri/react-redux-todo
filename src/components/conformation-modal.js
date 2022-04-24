import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import PropTypes from "prop-types";

/**
 * @component
 * @example
 * <ConformationModal onClickYes={() => {}} isOpen={deleteModal} modalHeader="Text" onClose={() => {}} />
 */

function ConformationModal({ isOpen, onClose, onClickYes, modalHeader }) {
  return (
    <Dialog open={isOpen} maxWidth="xs" fullWidth onClose={onClose}>
      <DialogTitle>Are you sure !!</DialogTitle>
      <DialogContent>
        <DialogContentText>{modalHeader}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button
          autoFocus
          color="primary"
          variant="contained"
          onClick={onClickYes}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConformationModal.prototype = {
  isOpen: PropTypes.bool.isRequired,
  modalHeader: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onClickYes: PropTypes.func.isRequired,
};

export { ConformationModal };
