using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ERP.API.Migrations
{
    public partial class accounting_modify : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastUpdated",
                table: "GeneralLedgers");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "GeneralLedgers",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Amount",
                table: "DebitAccounts",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Amount",
                table: "CreditAccounts",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "GeneralLedgers");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "DebitAccounts");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "CreditAccounts");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdated",
                table: "GeneralLedgers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
