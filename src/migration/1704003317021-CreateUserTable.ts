import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1704003317021 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			CREATE TABLE \`users\` (
				\`id\` CHAR(36) NOT NULL PRIMARY KEY,
				\`username\` VARCHAR(32) NOT NULL,
				\`password\` TEXT NOT NULL,
				\`created_at\` BIGINT NOT NULL,
				\`updated_at\` BIGINT NULL,
				\`deleted_at\` BIGINT NULL
			) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
		`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			DROP TABLE \`users\`;
		`);
  }
}
