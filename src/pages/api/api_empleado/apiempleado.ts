const API =process.env.REACT_APP_API;
export const api_getEmpleados = async () => {
    try {
     
        const resp = await fetch(`${API}/empleado`);
     
        if (resp.ok) {
     
            const data = await resp.json().catch((error) => {
                console.log("error en fetch data", error);
            });
            //console.log(data)
            return data;
        } else {
            return resp;
        }


    } catch (error) {
        console.log("Erron en fetch", error)
    }
};
export const api_getEmpleadosTecnicos = async () => {
    try {
     
        const resp = await fetch(`${API}/empleado/empleadostecnicos/tecnico`);
     
        if (resp.ok) {
     
            const data = await resp.json().catch((error) => {
                console.log("error en fetch data", error);
            });
            //console.log(data)
            return data;
        } else {
            return resp;
        }


    } catch (error) {
        console.log("Erron en fetch", error)
    }
};