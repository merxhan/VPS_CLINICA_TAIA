import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddEstadoToSesiones1690000000002 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
