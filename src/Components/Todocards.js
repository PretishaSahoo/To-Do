import React from 'react';
import { MdDelete } from 'react-icons/md';
import { TiEdit } from 'react-icons/ti';

export default function Todocards(props) {
  const { del, id, display,updateId ,toBeUpdate } = props;

  return (
    <div>
      <div className="toDoBody container">
        <div className="card" style={{ width: '18rem' }}>
          <div className="card-body">
            <h6 className="card-subtitle mb-2" style={{ color: 'red', fontSize: '20px' }}>
              <b>{props.title}</b>
            </h6>
            <p className="card-text">{props.body}</p>
            <div className="d-flex" style={{ color: 'grey' }}>
              <MdDelete onClick={() => del(id)} />
              <TiEdit
               onClick={
                () => {
                  display('block')
                  toBeUpdate(updateId)
                  }
                } />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
