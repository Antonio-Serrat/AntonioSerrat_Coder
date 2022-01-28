const fsp = require('fs').promises;
const fs = require('fs');

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    async save(title, price, img) {
        let producto = {
            tittle: title,
            price: price,
            thumbnail: img,
            id: 0
        };
        let newData = [];
        try {
            if (!(fs.existsSync(`./${this.nombreArchivo}.txt`))) {
                const data = JSON.stringify(newData, null, 2)
                fs.writeFileSync(`./${this.nombreArchivo}.txt`, data, (err) => {
                    if (err) throw error;
                })
            }
            await fsp.readFile(`./${this.nombreArchivo}.txt`, (err, data) => {
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

                fsp.writeFile(`./${this.nombreArchivo}.txt`, newFile, (err) => {
                    if (err) throw error;
                    return producto.id;
                })
            })
        } catch (error) {
            return error;
        }
    }

    async getAll() {
        try {
            const data = await fsp.readFile(`./${this.nombreArchivo}.txt`) 
                const obj = JSON.parse(data);
                return obj;
        } catch (error) {
            return error
        }
    }

    async getById(id) {
        try {
            await fsp.readFile(`./${this.nombreArchivo}.txt`, (err, data) => {
                if (err) throw error;
                const products = JSON.parse(data);
                const product = products.find(product => product.id == id)
                if(product != null) {
                    return product;    
                }
                
                return null;
            })
        } catch (error) {
            return error
        }
    }

    async deleteById(id) {
        try {
            await fsp.readFile(`./${this.nombreArchivo}.txt`, (err, data) => {
                if (err) throw error;
                const originalFile = JSON.parse(data);
                const objects = originalFile.filter((object) => object.id != id)
                const object = originalFile.filter(object => {object.id === id})
                if(object === null) {
                    return null
                }
                const newFile = JSON.stringify(objects, null, 2);
                fs.writeFile(`./${this.nombreArchivo}.txt`, newFile, (err) => {
                    if (err) throw error;
                });
            })
        } catch (error) {
            return error
        }
    }

    async deleteAll() {
        try {
            await fsp.writeFile(`./${this.nombreArchivo}.txt`, "[]", (err) => {
                if (err) throw error;
            })
            
        } catch (error) {
            return error
        }
    }
}
module.exports = Contenedor;