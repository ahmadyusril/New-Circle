import { MigrationInterface, QueryRunner } from "typeorm";

export class ThreadsMigration1699259985456 implements MigrationInterface {
    name = 'ThreadsMigration1699259985456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "following" ("following_id" integer NOT NULL, "follower_id" integer NOT NULL, CONSTRAINT "PK_b5a43b0475383cd39c2be06edb3" PRIMARY KEY ("following_id", "follower_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_45428a713ee7d51def21b67ff2" ON "following" ("following_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_59f580ba79fe33c121f8c3cc09" ON "following" ("follower_id") `);
        await queryRunner.query(`ALTER TABLE "following" ADD CONSTRAINT "FK_45428a713ee7d51def21b67ff20" FOREIGN KEY ("following_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "following" ADD CONSTRAINT "FK_59f580ba79fe33c121f8c3cc095" FOREIGN KEY ("follower_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "following" DROP CONSTRAINT "FK_59f580ba79fe33c121f8c3cc095"`);
        await queryRunner.query(`ALTER TABLE "following" DROP CONSTRAINT "FK_45428a713ee7d51def21b67ff20"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_59f580ba79fe33c121f8c3cc09"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_45428a713ee7d51def21b67ff2"`);
        await queryRunner.query(`DROP TABLE "following"`);
    }

}
