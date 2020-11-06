import React, { useState } from "react";
import { DataStore } from '@aws-amplify/datastore'
import { Board } from '../models'

import Modal from "react-modal";

Modal.setAppElement("#create-board");

const CreateBoard = () => {
  const initialState = "";
  const [newBoardTitle, setNewBoardTitle] = useState(initialState);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const handleChange = (e) => setNewBoardTitle(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setNewBoardTitle(initialState);
      await DataStore.save(new Board({ name: newBoardTitle }))
      closeModal();
    } catch (err) {
      console.log("error creating board:", err);
    }
  };
  return (
    <div>
      <Modal
        className="mx-auto mt-64 bg-gray-900  rounded-lg m-20 md:w-1/2 max-w-md p-5 shadow-lg"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Create Board Modal"
        overlayClassName="bg-gray-800 bg-opacity-75  bottom-0 top-0 left-0 right-0 fixed"
      >
        <div className="text-white font-medium text-lg">Create A New Board</div>
        <form onSubmit={handleSubmit} className="flex flex-col my-5">
          <input
            className="form-input mb-5"
            placeholder="Enter Board Name"
            onChange={handleChange}
            value={newBoardTitle}
            type="text"
          />
          <button className="ml-auto btn" type="submit">
            Create
          </button>
        </form>
      </Modal>
      <button className="btn" onClick={openModal}>
        Create Board +
      </button>
    </div>
  );
};

export default CreateBoard;
