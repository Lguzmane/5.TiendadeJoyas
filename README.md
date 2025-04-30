API REST Tienda de Joyas - Instrucciones Técnicas

REQUISITOS PREVIOS:
1. PostgreSQL instalado y en ejecución
2. Node.js (v16+ recomendado)
3. npm o yarn

INSTRUCCIONES DE IMPLEMENTACIÓN:

1. CONFIGURACIÓN DE BASE DE DATOS:
- Ejecutar el siguiente script SQL en psql o pgAdmin:

CREATE DATABASE joyas;
\c joyas;

CREATE TABLE inventario (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  categoria VARCHAR(50) NOT NULL,
  metal VARCHAR(50) NOT NULL,
  precio INT NOT NULL,
  stock INT NOT NULL
);

INSERT INTO inventario VALUES
(DEFAULT, 'Collar Heart', 'collar', 'oro', 20000, 2),
(DEFAULT, 'Collar History', 'collar', 'plata', 15000, 5),
(DEFAULT, 'Aros Berry', 'aros', 'oro', 12000, 10),
(DEFAULT, 'Aros Hook Blue', 'aros', 'oro', 25000, 4),
(DEFAULT, 'Anillo Mish', 'aros', 'plata', 30000, 4),
(DEFAULT, 'Anillo Cuarzo Greece', 'anillo', 'oro', 40000, 2);

2. INSTALACIÓN DE DEPENDENCIAS:
- Crear archivo package.json con: npm init -y
- Instalar dependencias: npm install express pg

3. CONFIGURACIÓN DEL SERVIDOR:
- Crear archivo index.js con el código proporcionado
- Asegurar que las credenciales de PostgreSQL coincidan con el entorno local

4. INICIO DEL SISTEMA:
- Ejecutar: node index.js
- El servidor iniciará en http://localhost:3000

ENDPOINTS IMPLEMENTADOS:
1. GET /joyas
- Parámetros opcionales: limits, page, order_by
- Retorna estructura HATEOAS

2. GET /joyas/filtros
- Parámetros: precio_min, precio_max, categoria, metal
- Retorna joyas filtradas

VALIDACIONES:
- Middleware de logging activo
- Consultas parametrizadas en /joyas/filtros
- Manejo centralizado de errores