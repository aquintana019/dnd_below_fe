import { gql } from "apollo-angular";

const GET_ALL_CLASES = gql`
  query GetAllClases {
    getAllClases {
      nombreClase
      id
      dadoGolpe
      lanzamientoHechizo
      tiradaSalvacion1
      tiradaSalvacion2
      descripcion
    }
  }
`;

export {GET_ALL_CLASES};

const GET_ALL_HECHIZOS = gql`
query GetAllHechizos{
  getAllHechizos{
    nombre
    id
    nivelHechizo
    descripcion
    escuela
    tiempoLanzamiento
    duracion
    alcance
  }
}
`;

export {GET_ALL_HECHIZOS};

const CREAR_USUARIO = gql`
mutation CrearUsuario($user: String!, $password: String!, $esAdmin: Int!) {
  crearUsuario(user: $user , password: $password, esAdmin: $esAdmin) {
      ID
      nombreUsuario
      imagenPerfil
      password
  }
}
`;
export {CREAR_USUARIO};

const GET_USUARIO = gql`
query ComprobarUsuario($user: String!) {
  comprobarUsuario(user: $user) {
    nombreUsuario
}
}`

export {GET_USUARIO}

const LOGIN = gql`
query Login($user: String!, $password: String!) {
  login(user: $user, password:$password) {
      ID
      nombreUsuario
      esAdmin
  }
}`

export {LOGIN}