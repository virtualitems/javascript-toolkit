# Ladder Architecture

```xml
<bootstrap>  <!-- root element -->
    <content>  <!-- recursive tree -->

    <container>
        <content/>  <!-- recursive tree -->
    </container>

    <container>
        <content/>  <!-- recursive tree -->
    </container>

    <container>
    <content/>  <!-- recursive tree -->
    </container>

    </content>
</bootstrap>
```

<br/>

# Introduction

La arquitectura de escalera es un patrón de arquitectura que ordena los componentes de una aplicación frontend en una jerarquía de contenedores y contenido.

**Ventajas**
- Facilita la organización de los componentes.
- Brinda una estructura clara y fácil de entender.
- Divide los componentes en contenedores y contenido según su función.

<br/>

# Definiciones

**Bootstrap:** Es el punto de entrada para el renderizado de la interfaz de usuario. Este elemento raíz debe gestionar los contextos y proveedores necesarios para la aplicación.

**Container:** Es un componente que debe recibir y organizar otros componentes.

**Content:** Es un componente que puede contener otros componentes aunque no es obligatorio. Su finalidad es mostrar información o interactuar con el usuario. En caso de tener componentes internos, debe gestionar el estado y los manejadores de eventos de dichos componentes.

<br/>

# Estructura básica

- Bootstrap (render, contexts, providers)
    - Router (contenedor)
    - Page (contenido)
        - Layout (contenedor)
        - Composite (sección, contenido)
            - Composite (elemento, contenedor)
            - Atomic (contenido)