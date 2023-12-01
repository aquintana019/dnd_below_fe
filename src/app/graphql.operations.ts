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

const GUARDAR_PERSONAJE = gql`
mutation GuardarPersonaje($nombrePersonaje: String!, $nivel: Int!, $experiencia: Int!, $raza: String!, $clasePersonaje: String!, $subclasePersonaje: String, $puntosGolpe: Int!, $bonificadorCompetencia: Int!, $fuerza: Int!, $destreza: Int!, $constitucion: Int!, $inteligencia: Int!, $sabiduria: Int!, $carisma: Int!, $competencia1: String, $competencia2: String, $competencia3: String, $competencia4: String, $competencia5: String, $usuarioId: Int!, $alineamiento: String!, $trasfondo: String!, $puntosGolpeMaximo: Int!) {
  guardarPersonaje(
      nombrePersonaje: $nombrePersonaje
      nivel: $nivel
      experiencia: $experiencia
      raza: $raza
      clasePersonaje: $clasePersonaje
      subclasePersonaje: $subclasePersonaje
      puntosGolpe: $puntosGolpe
      bonificadorCompetencia: $bonificadorCompetencia
      fuerza: $fuerza
      destreza: $destreza
      constitucion: $constitucion
      inteligencia: $inteligencia
      sabiduria: $sabiduria
      carisma: $carisma
      usuarioId: $usuarioId
      competencia1: $competencia1
      competencia2: $competencia2
      competencia3: $competencia3
      competencia4: $competencia4
      competencia5: $competencia5
      alineamiento: $alineamiento
      trasfondo: $trasfondo
      puntosGolpeMaximo: $puntosGolpeMaximo
  ) {
      nombrePersonaje
      id
      nivel
      experiencia
      raza
      clasePersonaje
      subclasePersonaje
      puntosGolpe
      bonificadorCompetencia
      fuerza
      destreza
      constitucion
      inteligencia
      sabiduria
      carisma
      competencia1
      competencia2
      competencia3
      competencia4
      competencia5
      usuarioId
      alineamiento
      trasfondo
      puntosGolpeMaximo
  }
}
`
export {GUARDAR_PERSONAJE}

const MOSTRAR_PERSONAJES_USUARIO = gql `
query MostrarPersonajesUsuario($usuarioId: Int!) {
  mostrarPersonajesUsuario(usuarioId: $usuarioId) {
      nombrePersonaje
      nivel
      experiencia
      raza
      clasePersonaje
      subclasePersonaje
      puntosGolpe
      bonificadorCompetencia
      fuerza
      destreza
      constitucion
      inteligencia
      sabiduria
      carisma
      competencia1
      competencia2
      competencia3
      competencia4
      competencia5
      usuarioId
      id
      alineamiento
      trasfondo
      puntosGolpeMaximo

  }
}
`
export {MOSTRAR_PERSONAJES_USUARIO}

const ELIMINAR_PERSONAJE = gql`
mutation EliminarPersonaje($id: Int!) {
  eliminarPersonaje(id: $id)
}`

export {ELIMINAR_PERSONAJE}

const BUSCAR_PERSONAJE_POR_ID = gql`
query EncontrarPersonajePorId($id: Int!) {
  encontrarPersonajePorId(id: $id) {
      nombrePersonaje
      id
      nivel
      experiencia
      raza
      clasePersonaje
      subclasePersonaje
      puntosGolpe
      bonificadorCompetencia
      fuerza
      destreza
      constitucion
      inteligencia
      sabiduria
      carisma
      competencia1
      competencia2
      competencia3
      competencia4
      competencia5
      usuarioId
      alineamiento
      trasfondo
      puntosGolpeMaximo
  }
}`

export{BUSCAR_PERSONAJE_POR_ID}

const BUSCAR_CLASE_POR_ID = gql`
query FindById($id: Int!) {
  findById(id: $id) {
      nombreClase
      id
      dadoGolpe
      lanzamientoHechizo
      tiradaSalvacion1
      tiradaSalvacion2
      descripcion
  }
}
`
export {BUSCAR_CLASE_POR_ID}

const BUSCAR_CLASE_POR_NOMBRE = gql`
query GetClasesPorNombre($nombre: String!) {
  getClasesPorNombre(nombre: $nombre) {
      nombreClase
      id
      dadoGolpe
      lanzamientoHechizo
      tiradaSalvacion1
      tiradaSalvacion2
      descripcion
  }
}`
export {BUSCAR_CLASE_POR_NOMBRE}


const MODIFICAR_PERSONAJE = gql`
mutation ModificarPersonaje($id: Int!, $nombrePersonaje: String!, $nivel: Int!, $experiencia: Int!, $raza: String!, $clasePersonaje: String!, $subclasePersonaje: String, $puntosGolpe: Int!, $bonificadorCompetencia: Int!, $fuerza: Int!, $destreza: Int!, $constitucion: Int!, $inteligencia: Int!, $sabiduria: Int!, $carisma: Int!, $competencia1: String, $competencia2: String, $competencia3: String, $competencia4: String, $competencia5: String, $usuarioId: Int!, $alineamiento: String!, $trasfondo: String!, $puntosGolpeMaximo: Int!) {
  modificarPersonaje(
      id: $id
      nombrePersonaje: $nombrePersonaje
      nivel: $nivel
      experiencia: $experiencia
      raza: $raza
      clasePersonaje: $clasePersonaje
      subclasePersonaje: $subclasePersonaje
      puntosGolpe: $puntosGolpe
      bonificadorCompetencia: $bonificadorCompetencia
      fuerza: $fuerza
      destreza: $destreza
      constitucion: $constitucion
      inteligencia: $inteligencia
      sabiduria: $sabiduria
      carisma: $carisma
      usuarioId: $usuarioId
      competencia1: $competencia1
      competencia2: $competencia2
      competencia3: $competencia3
      competencia4: $competencia4
      competencia5: $competencia5
      alineamiento: $alineamiento
      trasfondo: $trasfondo
      puntosGolpeMaximo: $puntosGolpeMaximo
  ) {
      nombrePersonaje
      id
      nivel
      experiencia
      raza
      clasePersonaje
      subclasePersonaje
      puntosGolpe
      bonificadorCompetencia
      fuerza
      destreza
      constitucion
      inteligencia
      sabiduria
      carisma
      competencia1
      competencia2
      competencia3
      competencia4
      competencia5
      usuarioId
      alineamiento
      trasfondo
      puntosGolpeMaximo
  }
}
`
export {MODIFICAR_PERSONAJE}
