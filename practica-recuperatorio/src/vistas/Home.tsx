import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Rubro } from "../entidades/Rubro";
import { Articulo } from "../entidades/Articulo";
import { deleteById, getAllArticulosXIdRubros, getAllRubros } from "../accesorios/LlamadasBack"
import EliminarFormModal from "../componentes/EliminarFormModal";


const HomeView: React.FC = () => {
    const [rubros, setRubros] = useState<Rubro[]>([]);
    const [articulos, setArticulos] = useState<Articulo[]>([]);
    const [idSelect, setIdSelect] = useState<number>();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [articuloSeleccionado, setArticuloSeleccionado] = useState<Articulo | undefined>();

    async function getRubros() {
        let data = await getAllRubros();
        setRubros(data);
    }

    async function getArticulos(idx: number) {
        let data = await getAllArticulosXIdRubros(idx);
        setArticulos(data);
    }

    const handleChange = (id: number) => {
        console.log(id)
        if (id !== 0) {
            setIdSelect(id);
            getArticulos(id)
        };
    }

    const handleOpenDeleteModal = (articulo?: Articulo) => {
        setIsDeleteModalOpen(true);
        setArticuloSeleccionado(articulo);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setArticuloSeleccionado(undefined);
    };

    const handleConfirmDelete = () => {
        if (articuloSeleccionado) {
            deleteById(articuloSeleccionado.id)
                .then(() => {
                    handleCloseDeleteModal();
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('Error al eliminar el localidad:', error);
                });
        }

    };
    
    

    useEffect(() => {
        getRubros();
    }, []);

    return (
        <div className="HomeView">
            <select value={idSelect} onChange={(e) => { handleChange(parseInt(e.target.value)) }}>
                <option value=''>Seleccione una Rubro</option>
                {rubros.map((rubro: Rubro, index) => (
                    <option key={rubro.id} value={rubro.id}>{rubro.denominacion}</option>
                ))}
            </select>
            <button type="button" className="btn btn-primary" onClick={event => window.location.href = 'http://localhost:3000/formCrud/0'}>Agregar</button>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Codigo</th>
                        <th>Denominacion</th>
                        <th>Rubro</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {articulos.map((articulo: Articulo, index) => (
                        <tr key={articulo.id}>
                            <td>{articulo.id}</td>
                            <td>{articulo.codigo}</td>
                            <td>{articulo.denominacion}</td>
                            <td>{articulo.idrubro}</td>
                            <td>
                            <button type="button" className="btn btn-warning" onClick={event => window.location.href = 'http://localhost:3000/formCrud/'+articulo.id}>Editar</button>
                                <button type="button" className="btn btn-danger" onClick={() => handleOpenDeleteModal(articulo)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <EliminarFormModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
            />
        </div>
    )
}

export default HomeView;