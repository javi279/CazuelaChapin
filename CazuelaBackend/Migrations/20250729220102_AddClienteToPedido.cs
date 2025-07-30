using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CazuelaBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddClienteToPedido : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PedidoDetalles_Pedidos_PedidoId",
                table: "PedidoDetalles");

            migrationBuilder.RenameColumn(
                name: "ProductoId",
                table: "PedidoDetalles",
                newName: "ItemId");

            migrationBuilder.RenameColumn(
                name: "PrecioUnitario",
                table: "PedidoDetalles",
                newName: "Tipo");

            migrationBuilder.AddColumn<string>(
                name: "Cliente",
                table: "Pedidos",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Estado",
                table: "Pedidos",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "PedidoId",
                table: "PedidoDetalles",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PedidoDetalles_Pedidos_PedidoId",
                table: "PedidoDetalles",
                column: "PedidoId",
                principalTable: "Pedidos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PedidoDetalles_Pedidos_PedidoId",
                table: "PedidoDetalles");

            migrationBuilder.DropColumn(
                name: "Cliente",
                table: "Pedidos");

            migrationBuilder.DropColumn(
                name: "Estado",
                table: "Pedidos");

            migrationBuilder.RenameColumn(
                name: "Tipo",
                table: "PedidoDetalles",
                newName: "PrecioUnitario");

            migrationBuilder.RenameColumn(
                name: "ItemId",
                table: "PedidoDetalles",
                newName: "ProductoId");

            migrationBuilder.AlterColumn<int>(
                name: "PedidoId",
                table: "PedidoDetalles",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_PedidoDetalles_Pedidos_PedidoId",
                table: "PedidoDetalles",
                column: "PedidoId",
                principalTable: "Pedidos",
                principalColumn: "Id");
        }
    }
}
