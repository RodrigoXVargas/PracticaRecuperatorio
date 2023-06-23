import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactModal from 'react-modal';


interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const EliminarFormModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} >
            <div>
                <div>
                    <h2>¿Eliminar Articulo?</h2>
                </div>
                <div>
                    <p>¿Estás seguro de que deseas eliminar este articulo?</p>
                </div>
                <div>
                    <button className='btn btn-danger' onClick={onConfirm}>Confirmar</button>
                    <button className='btn btn-secondary' onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </ReactModal>
    )
}

export default EliminarFormModal;