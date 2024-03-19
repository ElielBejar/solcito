//route es la ruta despues del localhost
//conf es la especificacion en json de la request

const port = 3000;
const baseRoute = `http://localhost:${port}`;
let route;
let conf;

function sendReq(route, conf) {
    return new Promise((resolve, reject) => {
        fetch(baseRoute + route, conf).then(response => {
            if (!response.ok) {
                throw new Error("network response was not ok");
            }
            return response.json();
        }).then(data => {
            resolve(data);
        }).catch(error => {
            reject(error);
        });

    });
}