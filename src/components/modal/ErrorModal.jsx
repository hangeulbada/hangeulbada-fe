import React from 'react';
import ReactModal from 'react-modal';
import './modal.css';
import zIndex from '@mui/material/styles/zIndex';

export default function ErrorModal({ isOpen, message, onClose }) {
    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 100,
        },
        content: {
            width: '350px',
            height: '120px',
            margin: 'auto',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
        },
    };

    return (
        <div>
            <ReactModal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
                <p className="content_text">{message}</p>
                <button onClick={onClose} className="ok_button">
                    확인
                </button>
            </ReactModal>
        </div>
    );
}
