# Seccion 9: Alcances del REST-Server y mantenimiento de la coleccion de usuarios

## Temas de la sección:

Aquí cubriremos varios temas como:

- Definir los alcances de nuestro RESTServer
- CRUD
- Encriptación de contraseñas
- Validaciones personalizadas
- Creación de roles
- Conexiones con MLAB
- Despliegue de base de datos en la nube
- Conexión con Robo 3T con base de datos en la nube
- Configuración de variables de entorno
- Borrado de archivos
- a. Eliminado físico de la base de datos
- b. Eliminación por estado en un campo de la colección

## Base de Datos : Super-Cafe

```script
usuarios :{
    __id: automatico
    nombre: string
    email: string
    password: string - crypt
    google: boolean
    role: string
    img: string
    estado: boolean
}

categorias: {
    __id: automatico
    nombre: string
    usuario: objectld
}

productos :{
    __id: automatico
    nombre: string
    precioUni: number
    categoria: objectld
    disponible: boolean
    usuario: objectld
}
```

## MongoDB - MongoAtlas

```
admin{
    user:       runin
    password:   robTFDJ8q6Kibe9y
}
user1{
    user:       user_node_cafe
    password:   6bZIGrRDH8dvi2kv
}
```
