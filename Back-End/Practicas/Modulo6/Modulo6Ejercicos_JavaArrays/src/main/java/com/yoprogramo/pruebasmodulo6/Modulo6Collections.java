
package com.yoprogramo.pruebasmodulo6;

import java.util.*;

public class Modulo6Collections {

    public void modulo6Al() {
        //Declaración e inicialización de una ArrayList
        List<Persona> listaPersonas = new ArrayList<Persona>();
        listaPersonas.add(new Persona(1, "Gabriel", 30));
        listaPersonas.add(new Persona(2, "Lucy", 30));
        listaPersonas.add(new Persona(3, "Guillermo", 30));
        listaPersonas.add(new Persona(4, "Luisina", 29));
        System.out.println("En la lista hay: " + listaPersonas.size() + ", personas.");

        //Para recorrer
        System.out.println("Recorriendo la lista y mostrar el nombre y los años *************");
        //opción 1
        for (Persona pers : listaPersonas) {
            System.out.println("Nombre: " + pers.getNombre());
            System.out.println("Edad: " + pers.getEdad());
        }

        System.out.println("Recorriendo la lista y mostrar objetos ********************");
        //opcción 2
        for (int i = 0; i < listaPersonas.size(); i++) {
            System.out.println("Persona: " + listaPersonas.get(i));
        }
        System.out.println("Fin**************************************************************");

    }

    public void modulo6Ll() {
        //Declaración e inicialización de una Linked List
        List<Persona> listaPersonas = new LinkedList<Persona>();

        //carga al final
        listaPersonas.add(new Persona(1, "Gabriel", 30));
        listaPersonas.add(new Persona(2, "Lucy", 56));

        //carga al principio (sobre lista ya cargada)
        listaPersonas.add(0, new Persona(4, "Luisina", 29));

        //recorrido 1
        for (Persona pers : listaPersonas) {
            System.out.println("Nombre: " + pers.getNombre());
            System.out.println("Edad: " + pers.getEdad());
        }
        System.out.println("");
        //recorrido 2
        System.out.println("Lista de objetos instanciados de la clase Persona: ");
        System.out.println("----------------------------------------");
        for (int i = 0; i < listaPersonas.size(); i++) {

            System.out.println(listaPersonas.get(i));
        }
    }

    public void modulo6S() {
        //Creación de una Stack List (pila)
        Stack<Integer> pila = new Stack<Integer>();

        //verifica si está vacía la pila
        System.out.println("¿Está vacía la pila?: " + pila.isEmpty());

        //insertar registros al final de la pila
        pila.push(1); //voy agregando números, dado que es un Integer
        pila.push(2);
        pila.push(3);
        pila.push(4);

        //recorrer la pila
        for (Integer pil : pila) {
            System.out.println(pil); //muestra el orden de la pila
        }

        //borra el elemento tope de la pila
        pila.pop();

        //busca elemento "x"
        //devuelve 1 o número positivo si encuentra el valor
        //si no lo encuentra devuelve -1
        System.out.println("¿Está el número en la pila: " + pila.search(3));

        //mostrar el elemento tope de la pila sin eliminarlo
        System.out.println(pila.peek());

        //verifica si está vacía la pila
        System.out.println("¿Está vacía la pila?: " + pila.isEmpty());
    }

    //Ejercicios Collections
    public void modulo6Co1() {
        //a.Crear un ArrayList de tipo Mascota. Crear 5 mascotas y guardarlas en la lista.
        List<Mascota> listaMascotas = new ArrayList<Mascota>();
        listaMascotas.add(new Mascota("Tom", "Gato", 'M', "Gris", "Tabby", "Ragdoll"));
        listaMascotas.add(new Mascota("Caty", "Perro", 'F', "Negro", "Carey", "Exótico"));
        listaMascotas.add(new Mascota("Minino", "Tortuga", 'M', "Marron", "Colourpoint", "British Shorthair"));
        listaMascotas.add(new Mascota("Ozzy", "Perro", 'M', "Blanco", "Multicolor", "Persa"));
        listaMascotas.add(new Mascota("Sunny", "Perro", 'F', "Gris", "Manchado", "Maine Coon"));

        //b.Recorrer la lista creada y mostrar por pantalla el nombre, 
        //   especie y pelaje de las mascotas almacenadas.
        for (Mascota mascota : listaMascotas) {
            System.out.println("Nombre: " + mascota.getNombre());
            System.out.println("Especie: " + mascota.getEspecie());
            System.out.println("Pelaje: " + mascota.getPelaje());
            System.out.println("***************************");

            //c1.Durante el recorrido, cambiar el nombre de dos mascotas. 
            if (mascota.getNombre() == "Tom") {
                mascota.setNombre("Pinky");
            }
            if (mascota.getNombre() == "Sunny") {
                mascota.setNombre("Cerebro");
            }
        }
        //c2.Volver a recorrer la lista y mostrar los nuevos datos
        System.out.println("");
        System.out.println("Nueva Lista con 2 cambios de nombres");
        for (Mascota mascota : listaMascotas) {
            System.out.println("Nombre: " + mascota.getNombre());
            System.out.println("Especie: " + mascota.getEspecie());
            System.out.println("Pelaje: " + mascota.getPelaje());
            System.out.println("***************************");
        }

        //d1.Agregar dos nuevas mascotas a la lista.
        listaMascotas.add(new Mascota("Jim", "Perro", 'M', "Chocolate", "Multicolor", "Exótico"));
        listaMascotas.add(new Mascota("Rimi", "Gato", 'F', "Blanco", "Carey", "Ragdoll"));

        //d2.Volver a recorrer la lista y mostrar los nuevos datos
        System.out.println("");
        System.out.println("Nueva Lista con los 2 nuevos objetos");
        for (Mascota mascota : listaMascotas) {
            System.out.println("Nombre: " + mascota.getNombre());
            System.out.println("Especie: " + mascota.getEspecie());
            System.out.println("Pelaje: " + mascota.getPelaje());
            System.out.println("***************************");
        }

        //e.Recorrer la lista pero solo mostrando las mascotas que sean de la especie “perro”.
        System.out.println("");
        System.out.println("Lista filtrada por la especie: Perro");
        for (Mascota mascota : listaMascotas) {
            if (mascota.getEspecie() == "Perro") {
                System.out.println(mascota.getNombre() + "--> " + mascota.getEspecie());
            }
        }

    }

    public void modulo6Co2() {
        //a.Crear una LinkedList de tipo Persona y agregar 20 personas distintas.
        List<Persona1> listaPersonas1 = new LinkedList<Persona1>();
        listaPersonas1.add(new Persona1(27226548, "Eduardo", "Silva", "Ameghino 567", 70573432, 20));
        listaPersonas1.add(new Persona1(23224531, "Damian", "Gomez", "Av. Mitre 1001", 43590563, 32));
        listaPersonas1.add(new Persona1(27226543, "Ernestina", "Perez", "Av. Belgrano 301", 87554323, 13));
        listaPersonas1.add(new Persona1(37236545, "Catalina", "Dominguez", "Levalle 43", 10276587, 54));
        listaPersonas1.add(new Persona1(17296440, "Romualdo", "Fernandez", "Alsina 100", 65473452, 65));
        listaPersonas1.add(new Persona1(32226541, "Jorge", "Leiva", "Corrientes 435", 87470956, 43));
        listaPersonas1.add(new Persona1(30246544, "Pedro", "Soria", "Zeballos 768", 10272354, 38));
        listaPersonas1.add(new Persona1(20226549, "Sandra", "Rejas", "Bustamante 321", 22270345, 21));
        listaPersonas1.add(new Persona1(29252540, "Sulma", "Carnota", "Ameghino 510", 76579674, 20));
        listaPersonas1.add(new Persona1(27226545, "Ricardo", "Perez", "La Rioja 30", 79876342, 15));
        listaPersonas1.add(new Persona1(27216548, "Estela", "Dimarsio", "Cuba 465", 34577983, 18));
        listaPersonas1.add(new Persona1(27206545, "Sabrina", "Pugliese", "Medrano 201", 85672143, 56));
        listaPersonas1.add(new Persona1(27266540, "Ernesto", "Dimarsio", "Tosco 234", 11165453, 76));
        listaPersonas1.add(new Persona1(27216547, "Etel", "Salcedo", "Sarmiento 40", 97511132, 32));
        listaPersonas1.add(new Persona1(16206540, "Caterina", "Carabajal", "Güemes 467", 24312343, 28));
        listaPersonas1.add(new Persona1(10296541, "Federico", "Abeledo", "Spur 12", 45736579, 69));
        listaPersonas1.add(new Persona1(24226542, "Alberto", "Cucusse", "Roca 3010", 56473452, 88));
        listaPersonas1.add(new Persona1(22276549, "Eduardo", "Basualdo", "Av. Rivadavia 256", 44478962, 05));
        listaPersonas1.add(new Persona1(34266543, "Javier", "Maradona", "Larralde 1234", 96545678, 32));
        listaPersonas1.add(new Persona1(18236540, "Jacinta", "Aguero", "Ameghino 400", 28779432, 74));

        //b.Crear dos LinkedLists de tipo Persona diferentes a la primera, 
        //una para almacenar a los menores de edad y otra para los mayores.
        List<Persona1> listaPersonas1Men18 = new LinkedList<Persona1>();
        List<Persona1> listaPersonas1May18 = new LinkedList<Persona1>();

        //c.Recorrer la lista principal buscando a las personas que sean mayores de 18 años. 
        //En caso que una persona tenga o sea mayor a 18 años, 
        //agregarla a la lista de mayores, caso contrario agregarla a una lista de menores.
        for (Persona1 pers : listaPersonas1) {
            if (pers.getEdad() >= 18) {
                listaPersonas1May18.add(pers);
            }
            if (pers.getEdad() < 18) {
                listaPersonas1Men18.add(pers);
            }
        }

        //d.Una vez realizada la separación, recorrer ambas nuevas listas 
        //y mostrar por pantalla el nombre, apellido y edad de cada una de las personas 
        //contenidas en cada lista.
        System.out.println("Mayores de Edad");
        System.out.println("--------------");
        for (Persona1 persMay : listaPersonas1May18) {
            System.out.println("Nombre: " + persMay.getNombre() + ", Apellido: " + persMay.getApellido() + ", Edad: " + persMay.getEdad() + ".");
        }
        System.out.println("");
        System.out.println("Menores de Edad");
        System.out.println("--------------");
        for (Persona1 persMen : listaPersonas1Men18) {
            System.out.println("Nombre: " + persMen.getNombre() + ", Apellido: " + persMen.getApellido() + ", Edad: " + persMen.getEdad() + ".");

        }

    }

    public void modulo6Co3() {
        //3.Crear una stack que permita objetos de tipo Autos, donde cada objeto auto debe tener: 
        //num_patente, marca, modelo, color, chasis. Cargar la pila con 7 autos diferentes 
        Stack<Auto> pilaAutos = new Stack<Auto>();
        pilaAutos.push(new Auto(345434, "Renault", "12", "Negro", 345456));
        pilaAutos.push(new Auto(245438, "Ford", "Ka", "Azul", 455436));
        pilaAutos.push(new Auto(545134, "Peugeot", "510", "Blanco", 985678));
        pilaAutos.push(new Auto(145232, "Ford", "Fiesta", "Negro", 125132));
        pilaAutos.push(new Auto(875731, "Fiat", "Uno", "Gris", 845634));
        pilaAutos.push(new Auto(465439, "Peugeot", "607", "Rojo", 765823));
        pilaAutos.push(new Auto(735249, "Ford", "Ka", "Plateado", 455798));

        //recorrer la pila
        System.out.println("Pila de Autos: ");
        for (Auto auto : pilaAutos) {
            System.out.println("num_patente: " + auto.getPatente() + ", marca: " + auto.getMarca() + ", modelo: " + auto.getModelo() + ", color: " + auto.getColor() + ", chasis: " + auto.getChasis() + ".");

        }
        System.out.println("******************************");

        System.out.println("");

        //luego hacer lo siguiente:
//a.Busacar un auto de color rojo.  
        String colorBuscar = "Negro";
        for (Auto auto : pilaAutos) {
            if (auto.getColor() == colorBuscar) {
                System.out.println("El auto " + colorBuscar + ", se encuentra en la posición: " + pilaAutos.search(auto));
            } else {
                System.out.println("No existe un auto de color " + colorBuscar + ", en la posición: " + pilaAutos.search(auto));
                continue;
            }
        }

//b.Mostrar el auto que se encuentra en la cima de la pila.
        System.out.println("");
        System.out.println("******************************");
        System.out.println("Este auto se encuentra en la cima de la pila");
        System.out.println(pilaAutos.peek());

//c.       Borrar el auto que se encuentra en la cima de la pila.
        System.out.println("");
        System.out.println("******************************");
        System.out.println("Se borró el auto que estaba en la cima");
        //borra el elemento tope de la pila
        pilaAutos.pop();

//d.      Agregar dos nuevos autos a la pila.
        System.out.println("");
        System.out.println("******************************");
        System.out.println("Agrega dos nuevos autos a la pila");
        pilaAutos.push(new Auto(234432, "Ferrari", "2000", "Rojo", 573012));
        pilaAutos.push(new Auto(765421, "Audi", "243", "Beige", 623078));

//Recorrer la pila mostrando el nuevo contenido luego de las operaciones realizadas.
        System.out.println("");
        System.out.println("******************************");
        System.out.println("Recorre la pila mostrando el nuevo contenido luego de las operaciones realizadas");
        for (Auto auto : pilaAutos) {
            System.out.println("num_patente: " + auto.getPatente() + ", marca: " + auto.getMarca() + ", modelo: " + auto.getModelo() + ", color: " + auto.getColor() + ", chasis: " + auto.getChasis() + ".");
        }
    }
}
