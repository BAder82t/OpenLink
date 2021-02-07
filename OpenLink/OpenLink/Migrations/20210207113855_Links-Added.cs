using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace OpenLink.Migrations
{
    public partial class LinksAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Link_APIModels_APIModelID",
                table: "Link");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Link",
                table: "Link");

            migrationBuilder.RenameTable(
                name: "Link",
                newName: "Links");

            migrationBuilder.RenameIndex(
                name: "IX_Link_APIModelID",
                table: "Links",
                newName: "IX_Links_APIModelID");

            migrationBuilder.AddColumn<Guid>(
                name: "APIID",
                table: "Links",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Links",
                table: "Links",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Links_APIModels_APIModelID",
                table: "Links",
                column: "APIModelID",
                principalTable: "APIModels",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Links_APIModels_APIModelID",
                table: "Links");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Links",
                table: "Links");

            migrationBuilder.DropColumn(
                name: "APIID",
                table: "Links");

            migrationBuilder.RenameTable(
                name: "Links",
                newName: "Link");

            migrationBuilder.RenameIndex(
                name: "IX_Links_APIModelID",
                table: "Link",
                newName: "IX_Link_APIModelID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Link",
                table: "Link",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Link_APIModels_APIModelID",
                table: "Link",
                column: "APIModelID",
                principalTable: "APIModels",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
