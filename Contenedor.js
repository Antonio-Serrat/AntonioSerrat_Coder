const fs = require('fs');



class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    save(title, price, img) {
        let producto = {
            tittle: title,
            price: price,
            thumbnail: img,
            id: 0
        };

        (async () => {
            let newData = [];
            try {
                if (!(fs.existsSync(`./${this.nombreArchivo}.txt`))) {
                    const data = JSON.stringify(newData, null, 2)
                    fs.writeFileSync(`./${this.nombreArchivo}.txt`, data, (err) => {
                        if (err) throw error;
                    })
                }
                await fs.readFile(`./${this.nombreArchivo}.txt`, (err, data) => {
                    if (err) throw error;
                    const oldFile = JSON.parse(data);
                    newData = oldFile;
                    newData.push(producto);
                    
                    let i = newData.length - 2;
                    i < 0 ? i = 0 : i;
                    let id = newData[i].id + 1;
                    producto.id = id;
                    producto.id == 0 ? producto.id = 1 : producto.id;    
                    const newFile = JSON.stringify(newData, null, 2);
                    
                    fs.writeFile(`./${this.nombreArchivo}.txt`, newFile, (err) => {
                        if (err) throw error;
                        console.log(producto.id);
                    })
                })    
            } catch (error) {
                return console.log("No se pudo guardar el producto,  error: " + error);
            }
        })()
    }
    
    getAll() {
        (async () => {
            try {
                await fs.readFile(`./${this.nombreArchivo}.txt`, (err, data) => {
                    if (err) throw error;

                    const obj = JSON.parse(data);
                    return (obj);
                });
            } catch (error) {
                return console.log(error)
            }
        })()
    }

    getById(id) {
        (async () => {
            try {
                await fs.readFile(`./${this.nombreArchivo}.txt`, (err, data) => {
                    if (err) throw error;
                    const products = JSON.parse(data);
                    let i = id - 1;
                    if (products[i] == null) { return console.log(null); }
                    return console.log(products[i]);
                })
            } catch (error) {
                return console.log(error)
            }
        })()
    }

    deleteById(id) {
            try {
                fs.readFile(`./${this.nombreArchivo}.txt`, (err, data) => {
                    if (err) throw error;
                    const originalFile = JSON.parse(data);
                    const objects = JSON.parse(data);
                    for (let i = 0; i < objects.length; i++) {
                        if (objects[i].id === id) {
                            objects.splice(i, 1);
                            console.log("objeto eliminado");
                        }
                    }
                    if (originalFile.length == objects.length){
                        console.log(`no se encontro el archivo con el id: ${id}. Porfavor intente con otro numero`);
                        throw error;
                    }
                    const newFile = JSON.stringify(objects, null, 2);
                    fs.writeFile(`./${this.nombreArchivo}.txt`, newFile, (err) => {
                        if (err) throw error;
                    });
                })
            } catch (error) {
                console.log(error)
            }
    }

    deleteAll() {
        try {
            fs.truncate(`./${this.nombreArchivo}.txt`, (err) => {
                if (err) throw error;
                fs.writeFileSync(`./${this.nombreArchivo}.txt`, "[]", (err) => {
                    if (err) throw error;
                })
            })
            console.log("Se eliminaron todos los objetos")
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = Contenedor;
