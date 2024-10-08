const app = Vue.createApp({
    data() {
      return {
        tiendas: [],
        nuevaTienda: {
            nombre: "",
            descripcion: "",
            clave: "",
            rfc: ""
        },
        mensaje: "",
        mostrar: false,
        errorMensaje: false
      }
    },
    methods: {
        async crearTienda($event) {
            $event.preventDefault();
            
            //Request
            const tienda = Object.assign({}, this.nuevaTienda);
            try {
                await axios.post('/stores/new', tienda, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                this.mensaje = "Se creó la tienda :D";
                this.errorMensaje = false;
            } catch(error) {
                this.mensaje = "No se ha podido crear la tienda";
                this.errorMensaje = true;
            } finally {
                this.mostrar = true;
                await this.actualizarTiendas();
            }
        },
        async actualizarTiendas() {
            let result = await axios.get('/stores/all');
            console.log(result);
            this.tiendas = result.data;
        },
        async borrarTienda(clave) {
            try {
                await axios.delete( `/stores/${clave}`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                this.mensaje = "Se eliminó la tienda :D";
                this.errorMensaje = false;
            } catch(error) {
                this.mensaje = "No se ha podido eliminar la tienda";
                this.errorMensaje = true;
            } finally {
                this.mostrar = true;
                await this.actualizarTiendas();
            }
        }
    },
    mounted() {
        this.actualizarTiendas();
    }
}).mount('#app')