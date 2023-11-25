import React from 'react';
import './App.css';

export default function App() {
  // Handler for dropping files
  const dropHandler = (event) => {
    event.preventDefault();
  
    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        if (event.dataTransfer.items[i].kind === 'file') {
          const file = event.dataTransfer.items[i].getAsFile();
          console.log('File name: ', file.name);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        console.log('File name: ', event.dataTransfer.files[i].name);
      }
    }
  };

  // Prevent default behavior (Prevent file from being opened)
  const dragOverHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div
      id="drop_zone"
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
      style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
      <p>Drag one or more files to this <i>drop zone</i>.</p>
    </div>
  );
}
