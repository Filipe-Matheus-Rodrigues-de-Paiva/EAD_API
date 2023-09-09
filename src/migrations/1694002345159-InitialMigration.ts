import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1694002345159 implements MigrationInterface {
    name = 'InitialMigration1694002345159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "content" text NOT NULL, "video_url" character varying(200), "courseId" uuid, CONSTRAINT "PK_b7c504072e537532d7080c54fac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "students_courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL DEFAULT 'pending', "studentId" uuid, "courseId" uuid, CONSTRAINT "PK_95d8c7d7068e6d39e099426401d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "status" character varying(20) NOT NULL DEFAULT 'not started', "start_date" character varying NOT NULL, "end_date" character varying NOT NULL, "instructorId" uuid, CONSTRAINT "UQ_6ba1a54849ae17832337a39d5e5" UNIQUE ("name"), CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(150) NOT NULL, "password" character varying(128) NOT NULL, "email" character varying(100) NOT NULL, "is_superuser" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_477e3187cedfb5a3ac121e899c9" UNIQUE ("username"), CONSTRAINT "UQ_ee66de6cdc53993296d1ceb8aa0" UNIQUE ("email"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contents" ADD CONSTRAINT "FK_21faa7158bdc3b618deec2831c9" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students_courses" ADD CONSTRAINT "FK_2bef51e23157fbf33be155648af" FOREIGN KEY ("studentId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students_courses" ADD CONSTRAINT "FK_b0a13f6c98271a5ee98da679cb8" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_e6714597bea722629fa7d32124a" FOREIGN KEY ("instructorId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_e6714597bea722629fa7d32124a"`);
        await queryRunner.query(`ALTER TABLE "students_courses" DROP CONSTRAINT "FK_b0a13f6c98271a5ee98da679cb8"`);
        await queryRunner.query(`ALTER TABLE "students_courses" DROP CONSTRAINT "FK_2bef51e23157fbf33be155648af"`);
        await queryRunner.query(`ALTER TABLE "contents" DROP CONSTRAINT "FK_21faa7158bdc3b618deec2831c9"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "courses"`);
        await queryRunner.query(`DROP TABLE "students_courses"`);
        await queryRunner.query(`DROP TABLE "contents"`);
    }

}
