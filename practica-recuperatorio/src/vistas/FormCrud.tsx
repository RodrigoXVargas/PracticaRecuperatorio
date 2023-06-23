import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Rubro } from "../entidades/Rubro";
import { Articulo } from "../entidades/Articulo";
import { getAllRubros, getByArticuloId, saveOrUpdate } from "../accesorios/LlamadasBack";



interface Formdata {
    id: number,
    codigo: string,
    denominacion: string,
    precio: number,
    idrubro: number,
}

const FormCrudView = () => {
    const { id } = useParams();
    const [rubros, setRubros] = useState<Rubro[]>([]);
    const [articuloSeleccionado, setArticuloSeleccionado] = useState<Articulo>();
    const [formData, setFormData] = useState<Formdata>({
        id: 0,
        codigo: "",
        denominacion: "",
        precio: 0,
        idrubro: 0,
    });


    async function getRubros() {
        let data = await getAllRubros();
        setRubros(data);
    }

    async function getArticulo(idx: number) {
        let data = await getByArticuloId(idx);
        setArticuloSeleccionado(data);
    }

    

    useEffect(() => {
        getRubros();
        if (id === undefined) {
            window.history.back()
        } else if (parseInt(id) !== 0) {
            getArticulo(parseInt(id))
        }
    }, [id]);

    useEffect(() => {
        if (articuloSeleccionado) {
            setFormData(articuloSeleccionado)
        } else {
            setFormData({
                id: 0,
                codigo: "",
                denominacion: "",
                precio: 0,
                idrubro: 0,
            })
        }
    }, [articuloSeleccionado])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };



    const handleSubmit = (e: FormEvent) => {
        
        e.preventDefault();
        let articulo = formData.id === 0
            ? new Articulo(formData.id, formData.codigo, formData.denominacion, formData.precio, formData.idrubro)
            : new Articulo(formData.id, formData.codigo, formData.denominacion, formData.precio, formData.idrubro)
        saveOrUpdate(articulo).then(() => {
            window.history.back();
        });
    };

    return (
        <div className="FormCrudModal">
            <h1>{articuloSeleccionado ? "Modificar" : "Agregar"}</h1>
            <div className="FormCrudView">
                <form onSubmit={handleSubmit}>
                    <div className="form-div-container">
                        <label htmlFor="">ID</label>
                        <input type="number" name="id" value={formData.id} placeholder="Id" onChange={handleChange} disabled />
                    </div>

                    <div className="form-div-container">
                        <label htmlFor="">Codigo</label>
                        <input type="text" name="codigo" value={formData.codigo} placeholder="codigo" onChange={handleChange} />
                    </div>

                    <div className="form-div-container">
                        <label htmlFor="">Denominacion</label>
                        <input type="text" name="denominacion" value={formData.denominacion} placeholder="denominacion" onChange={handleChange} />
                    </div>

                    <div className="form-div-container">
                        <label htmlFor="">Precio</label>
                        <input type="number" name="precio" value={formData.precio} placeholder="precio" onChange={handleChange} />
                    </div>

                    <select value={formData.idrubro} name="idrubro" onChange={handleChange}>
                        <option value=''>Seleccione un Rubro</option>
                        {rubros.map((rubro: Rubro, index) => (
                            <option key={rubro.id} value={rubro.id}>{rubro.denominacion}</option>
                        ))}
                    </select>
                    <div>
                        <button type="submit" className='btn btn-primary'>{articuloSeleccionado ? 'Guardar cambios' : 'Agregar'}</button>
                        <button className='btn btn-secondary' onClick={() => window.history.back()}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormCrudView;