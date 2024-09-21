const API =process.env.REACT_APP_API;
export const getBancos = async () => {
    try {
        const resp = await fetch(`${API}/banco`);
     
        if (resp.ok) {
            const data = await resp.json().catch((error) => {
                console.log("error en fetch data", error);
            });
            return data;
        } else {
            return resp;
        }


    } catch (error) {
        console.log("Erron en fetch", error)
    }
};