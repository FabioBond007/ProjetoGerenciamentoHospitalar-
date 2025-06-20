DROP DATABASE IF EXISTS trabalho_lucas;
CREATE DATABASE trabalho_lucas;
USE trabalho_lucas;

CREATE TABLE especialidades (
    especialidade_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT
);

CREATE TABLE enderecos(
endereco_id INT AUTO_INCREMENT PRIMARY KEY,
cep VARCHAR(9) NOT NULL,
rua VARCHAR(40),
bairro VARCHAR(20),
cidade VARCHAR(20),
estado VARCHAR(20)
);

CREATE TABLE funcionarios(
    funcionario_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(100),
    funcao SET('atendente', 'medico', 'admin'),
    endereco_id INT,
    FOREIGN KEY (endereco_id) REFERENCES enderecos(endereco_id)
    
);


CREATE TABLE profissionais (
    profissional_id INT AUTO_INCREMENT PRIMARY KEY,
    crm VARCHAR(20) NOT NULL,
    dias_semana SET('Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'),
    funcionario_id INT,
    FOREIGN KEY (funcionario_id) REFERENCES funcionarios(funcionario_id)
);

CREATE TABLE especialidades_profissionais(
    especialidade_profissional_id INT AUTO_INCREMENT PRIMARY KEY,
    profissional_id int,
    especialidade_id INT,
    rqe VARCHAR(20) NOT NULL,
    FOREIGN KEY (especialidade_id) REFERENCES especialidades(especialidade_id),
    FOREIGN KEY (profissional_id) REFERENCES profissionais(profissional_id)


);

CREATE TABLE pacientes (
    paciente_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    data_nascimento DATE,
    sexo SET('M', 'F', 'Outro'),
    telefone VARCHAR(20),
    email VARCHAR(100),
    endereco_id INT,
    FOREIGN KEY (endereco_id) REFERENCES enderecos(endereco_id)
);

CREATE TABLE prontuarios (
    prontuario_id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT UNIQUE, -- relação 1:1
    historico_doencas TEXT,
    alergias TEXT,
    observacoes_gerais TEXT,
    data_ultima_atualizacao DATETIME,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(paciente_id)
);

CREATE TABLE atendimentos (
    atendimento_id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT,
    profissional_id INT,
    funcionario_id INT,
    data_do_agendamento DATETIME,
    data_consulta DATETIME,
    tipo_atendimento SET('consulta', 'retorno'),
    diagnostico TEXT,
    prescricao TEXT,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(paciente_id),
    FOREIGN KEY (funcionario_id) REFERENCES funcionarios(funcionario_id),
    FOREIGN KEY (profissional_id) REFERENCES profissionais(profissional_id)
);




SHOW TABLES;
DESCRIBE especialidades;
DESCRIBE pacientes;
DESCRIBE profissionais;
DESCRIBE prontuarios;
DESCRIBE atendimentos;
DESCRIBE funcionarios;
DESCRIBE enderecos;
