import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTasksTable1650408626163 implements MigrationInterface {
  // What happens when we create
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tasks",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "title",
            type: "varchar(100)",
          },
          {
            name: "description",
            type: "varchar(500)",
          },
          {
            name: "time_logged",
            type: "int",
          },
          {
            name: "time_remaining",
            type: "int",
          },
          {
            name: "creator",
            type: "int",
          },
          {
            name: "priority",
            type: "int",
          },
          {
            name: "created_at",
            type: "int",
          },
          {
            name: "is_deleted",
            type: "boolean",
          },
          {
            name: "is_active",
            type: "boolean",
          },
        ],
      }),
      true
    );
  }

  // What happens when we remove
  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("tasks");
    const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf("id") !== -1);
    await queryRunner.dropForeignKey("tasks", foreignKey);
    await queryRunner.dropColumn("tasks", "questionId");
    await queryRunner.dropTable("tasks");
  }
}
