-- Script para la base de datos MySQL

CREATE DATABASE IF NOT EXISTS eventos_db;
USE eventos_db;

CREATE TABLE Cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Actividad (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(255) NOT NULL UNIQUE,
    nombre VARCHAR(255) NOT NULL,
    fecha DATE NOT NULL,
    clienteId INT NOT NULL,
    FOREIGN KEY (clienteId) REFERENCES Cliente(id) ON DELETE CASCADE
);
