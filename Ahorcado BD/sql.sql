-- Tabla de Categorías
CREATE TABLE Categorias (
    categoria_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_categoria VARCHAR(50) NOT NULL
);

-- Insertar datos en la tabla de Categorías
INSERT INTO Categorias (nombre_categoria) VALUES
    ('Animales'),
    ('Países'),
    ('Frutas'),
    ('Colores'),
    ('Profesiones'),
    ('Deportes'),
    ('Comida'),
    ('Cine'),
    ('Música'),
    ('Ciudades');

-- Tabla de Palabras
CREATE TABLE Palabras (
    palabra_id INT PRIMARY KEY AUTO_INCREMENT,
    palabra VARCHAR(50) NOT NULL,
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES Categorias(categoria_id)
);

-- Insertar datos en la tabla de Palabras ordenadamente por categoría
-- Insertar datos en la tabla de Palabras ordenadamente por categoría
INSERT INTO Palabras (palabra, categoria_id) VALUES
    -- Categoría 1: Animales
    ('Elefante', 1),
    ('Tigre', 1),
    ('León', 1),
    ('Jirafa', 1),
    ('Mono', 1),
    ('Cebra', 1),
    ('Hipopótamo', 1),
    ('Rinoceronte', 1),
    ('Koala', 1),
    ('Panda', 1),
    
    -- Categoría 2: Países
    ('Argentina', 2),
    ('Brasil', 2),
    ('España', 2),
    ('Francia', 2),
    ('Italia', 2),
    ('Alemania', 2),
    ('Japón', 2),
    ('China', 2),
    ('Canadá', 2),
    ('Australia', 2),

    -- Categoría 3: Frutas
    ('Manzana', 3),
    ('Plátano', 3),
    ('Fresa', 3),
    ('Naranja', 3),
    ('Pera', 3),
    ('Uva', 3),
    ('Kiwi', 3),
    ('Melocotón', 3),
    ('Mango', 3),
    ('Piña', 3),

    -- Categoría 4: Colores
    ('Rojo', 4),
    ('Azul', 4),
    ('Verde', 4),
    ('Amarillo', 4),
    ('Naranja', 4),
    ('Violeta', 4),
    ('Rosa', 4),
    ('Marrón', 4),
    ('Gris', 4),
    ('Negro', 4),

-- Categoría 5: Profesiones
    ('Doctor', 5),
    ('Ingeniero', 5),
    ('Enfermera', 5),
    ('Maestro', 5),
    ('Científico', 5),
    ('Policía', 5),
    ('Cocinero', 5),
    ('Artista', 5),
    ('Abogado', 5),
    ('Músico', 5),

-- Categoría 6: Deportes
    ('Fútbol', 6),
    ('Tenis', 6),
    ('Baloncesto', 6),
    ('Golf', 6),
    ('Natación', 6),
    ('Ciclismo', 6),
    ('Atletismo', 6),
    ('Voleibol', 6),
    ('Esquí', 6),
    ('Boxeo', 6),

    ('Pizza', 7),
    ('Hamburguesa', 7),
    ('Sushi', 7),
    ('Ensalada', 7),
    ('Pasta', 7),
    ('Tacos', 7),
    ('Sopa', 7),
    ('Parrillada', 7),
    ('Helado', 7),
    ('Chocolate', 7),

-- Categoría 8: Cine
    ('Película', 8),
    ('Actor', 8),
    ('Actriz', 8),
    ('Director', 8),
    ('Guion', 8),
    ('Escenario', 8),
    ('Premio', 8),
    ('Cámara', 8),
    ('Efectos', 8),
    ('Estreno', 8),
    -- Categoría 9: Música
    ('Guitarra', 9),
    ('Piano', 9),
    ('Violín', 9),
    ('Batería', 9),
    ('Canto', 9),
    ('Concierto', 9),
    ('Banda', 9),
    ('Melodía', 9),
    ('Rock', 9),
    ('Jazz', 9),
    -- Categoría 10: Ciudades
    ('París', 10),
    ('Nueva York', 10),
    ('Tokio', 10),
    ('Londres', 10),
    ('Roma', 10),
    ('Sídney', 10),
    ('Pekín', 10),
    ('Río de Janeiro', 10),
    ('Barcelona', 10),
    ('Berlín', 10);

--SELECT PARA PALABRAS JUNTO A CATEGORIA
SELECT p.palabra, c.nombre_categoria as categoria
FROM Palabras p, Categorias c 
WHERE p.categoria_id=c.categoria_id

--SELECT DE CATEGORIAS
SELECT nombre_categoria as categoria
FROM Categorias

CREATE TABLE Partidas (
    partida_id INT PRIMARY KEY AUTO_INCREMENT,
    puntos INT,
    usuario_id INT(50),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);