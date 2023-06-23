import { Articulo } from "../entidades/Articulo";



//getall rubros
export async function getAllRubros() {
    let urlServer = "http://168.194.207.98:8081/api_articulo/get_rubros.php";
    let response = await fetch(urlServer, {
        method: 'GET',
        headers: {
            'Content-type': "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        mode: 'cors'
    });
    console.log(response);
    return await response.json();
}

//get Articulos por rubro ID
export async function getAllArticulosXIdRubros(id:number) {
    let urlServer = "http://168.194.207.98:8081/api_articulo/get_articulos_por_rubro.php?idrubro="+id;
    let response = await fetch(urlServer, {
        method: 'GET',
        headers: {
            'Content-type': "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        mode: 'cors'
    });
    console.log(response);
    return await response.json();
}

//get articulo por id
export async function getByArticuloId(id:number) {
    let urlServer = "http://168.194.207.98:8081/api_articulo/get_articulo.php?id="+id;
    let response = await fetch(urlServer, {
        method: 'GET',
        headers: {
            'Content-type': "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        mode: 'cors'
    });
    console.log(response);
    return await response.json();
}

//get articulo por codigo
export async function getByArticuloCodigo(codigo: string) {
    let urlServer = "http://168.194.207.98:8081/api_articulo/get_articulos_por_codigo.php?codigo="+codigo;
    let response = await fetch(urlServer, {
        method: 'GET',
        headers: {
            'Content-type': "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        mode: 'cors'
    });
    console.log(response);
    return await response.json();
}



//Post y put articulo
export async function saveOrUpdate(objeto: Articulo) {
    
    let urlServer: string = '';
	let methodM:string = "";
	if(objeto.id === 0){
		urlServer = 'http://168.194.207.98:8081/api_articulo/post_articulo.php';
	    methodM = "POST";
	}else {
        urlServer = 'http://168.194.207.98:8081/api_articulo/put_articulo.php';
		methodM = "PUT";
    }
    console.log(JSON.stringify(objeto));
	await fetch(urlServer, {
	  method: methodM,
	  headers: {
		'Content-Type': 'application/json',
	  },
      body: JSON.stringify(objeto),
	  
	});
}

//delete articulo

export async function deleteById(id:number) {
    let urlServer = "http://168.194.207.98:8081/api_articulo/delete_articulo.php?id="+id;
    await fetch(urlServer, {
        method: 'DELETE',
        headers: {
            'Content-type': "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        mode: 'cors'
    });
    
}
