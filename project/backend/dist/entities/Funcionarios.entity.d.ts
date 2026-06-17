export declare enum RolFuncionario {
    ADMINISTRADOR = "administrador",
    TERAPEUTA = "terapeuta"
}
export declare class Funcionarios {
    id: number;
    nombre: string;
    cpf: string;
    password: string;
    rol: RolFuncionario;
}
