var personaEjemplo = {
    "apellido": "pablo",
    "nombre": "jere",
    "edad": 20,
    "documento": 12345
};


function crearPersona(nombre, apellido, edad, documento) {
    let persona = {
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        documento: documento
    };

    return persona;
}
console.log("resultado crearPersona: ", crearPersona("Juan", "Pérez", 20, 123456));



function agregarApodo(persona, apodo) {
    persona.apodo = apodo;
    return persona;
}
console.log("resultado agregarApodo: ", agregarApodo(personaEjemplo, "JuanPe"));



function sinDocumento(persona) {
    delete persona.documento;
    return persona;
}
console.log("resultado sinDocumento: ", sinDocumento(personaEjemplo));




// En este caso la funcion va a devolver false ya que en el punto 3 borramos el campo documento
function tieneDocumento(persona) {
    return "documento" in persona;
}
console.log("resultado tieneDocumento: ", tieneDocumento(personaEjemplo));



function nombreCompletoDePersona(persona) {
    return ""+persona.apellido+", "+persona.nombre;
}
console.log("resultado nombreCompletoDePersona: ", nombreCompletoDePersona(personaEjemplo));



function felizCumpleaños(persona) {
    persona.edad++;
    return persona.edad;
}
console.log("resultado felizCumpleaños: ", felizCumpleaños(personaEjemplo));



function sonLaMismaPersona(persona1, persona2) {
    return persona1.documento==persona2.documento;
}
console.log("resultado sonLaMismaPersona: ", sonLaMismaPersona(
    personaEjemplo,
    { apellido: "Perez", nombre: "Juan", edad: 20, documento: 12345 }
));


/
function personaMasGrande(persona1, persona2) {
    if(persona1.edad>persona2.edad) {
        return "Persona 1: "+persona1.edad;
    } else {
        return "Persona 2: "+persona2.edad;
    }
}
console.log("resultado personaMasGrande: ", personaMasGrande(
    { nombre: "Ana", edad: 30 },
    { nombre: "Luis", edad: 25 }
));
