﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using OpenLink.Data;

namespace OpenLink.Migrations
{
    [DbContext(typeof(OpenLinkContext))]
    [Migration("20210218213537_Comments")]
    partial class Comments
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.2");

            modelBuilder.Entity("OpenLink.Models.API.CommentModel", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("APIID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CommentModelID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<bool>("DidVote")
                        .HasColumnType("bit");

                    b.Property<string>("Messege")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("ReplyID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UserID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Vote")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("CommentModelID");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("OpenLink.Models.API.CommentVoteModel", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CommentID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("Response")
                        .HasColumnType("bit");

                    b.Property<Guid>("UserID")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("ID");

                    b.ToTable("Votes");
                });

            modelBuilder.Entity("OpenLink.Models.APIModel", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserID")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("ID");

                    b.ToTable("APIModels");
                });

            modelBuilder.Entity("OpenLink.Models.Account", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("RegisterID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Account");
                });

            modelBuilder.Entity("OpenLink.Models.Link", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("APIID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("APIModelID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InputData")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Method")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OutputData")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("URL")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("APIModelID");

                    b.ToTable("Links");
                });

            modelBuilder.Entity("OpenLink.Models.Login.ProfileModel", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("ProfileModel");
                });

            modelBuilder.Entity("OpenLink.Models.API.CommentModel", b =>
                {
                    b.HasOne("OpenLink.Models.API.CommentModel", null)
                        .WithMany("Replies")
                        .HasForeignKey("CommentModelID");
                });

            modelBuilder.Entity("OpenLink.Models.Link", b =>
                {
                    b.HasOne("OpenLink.Models.APIModel", null)
                        .WithMany("Links")
                        .HasForeignKey("APIModelID");
                });

            modelBuilder.Entity("OpenLink.Models.API.CommentModel", b =>
                {
                    b.Navigation("Replies");
                });

            modelBuilder.Entity("OpenLink.Models.APIModel", b =>
                {
                    b.Navigation("Links");
                });
#pragma warning restore 612, 618
        }
    }
}