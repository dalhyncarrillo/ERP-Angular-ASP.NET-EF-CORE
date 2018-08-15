using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ERP.API.Migrations
{
    public partial class AddapprovedBytoOrdertableGLtablescreated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ApprovedBy",
                table: "Orders",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "CreditAccounts",
                columns: table => new
                {
                    CreditAccountId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CreditAccounts", x => x.CreditAccountId);
                });

            migrationBuilder.CreateTable(
                name: "DebitAccounts",
                columns: table => new
                {
                    DebitAccountId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DebitAccounts", x => x.DebitAccountId);
                });

            migrationBuilder.CreateTable(
                name: "GeneralLedgers",
                columns: table => new
                {
                    TransactionId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Amount = table.Column<double>(nullable: false),
                    CreditAccountId = table.Column<int>(nullable: false),
                    DebitAccountId = table.Column<int>(nullable: false),
                    LastUpdated = table.Column<DateTime>(nullable: false),
                    Occured = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GeneralLedgers", x => x.TransactionId);
                    table.ForeignKey(
                        name: "FK_GeneralLedgers_CreditAccounts_CreditAccountId",
                        column: x => x.CreditAccountId,
                        principalTable: "CreditAccounts",
                        principalColumn: "CreditAccountId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GeneralLedgers_DebitAccounts_DebitAccountId",
                        column: x => x.DebitAccountId,
                        principalTable: "DebitAccounts",
                        principalColumn: "DebitAccountId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ApprovedBy",
                table: "Orders",
                column: "ApprovedBy");

            migrationBuilder.CreateIndex(
                name: "IX_GeneralLedgers_CreditAccountId",
                table: "GeneralLedgers",
                column: "CreditAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_GeneralLedgers_DebitAccountId",
                table: "GeneralLedgers",
                column: "DebitAccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Employees_ApprovedBy",
                table: "Orders",
                column: "ApprovedBy",
                principalTable: "Employees",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Employees_ApprovedBy",
                table: "Orders");

            migrationBuilder.DropTable(
                name: "GeneralLedgers");

            migrationBuilder.DropTable(
                name: "CreditAccounts");

            migrationBuilder.DropTable(
                name: "DebitAccounts");

            migrationBuilder.DropIndex(
                name: "IX_Orders_ApprovedBy",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ApprovedBy",
                table: "Orders");
        }
    }
}
