using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
namespace STGenetics.Models.contexts
{
    public partial class MainDBContext : DbContext
    {
        private string connectionString = "Data Source=data.sqlite";

        public MainDBContext(DbContextOptions<MainDBContext> o) : base(o) { }

        public virtual DbSet<Element> Element { get; set; } = null!;

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Element>(entity =>
            {
                entity.ToTable("Element");
                entity.Property(e => e.BirthDate).HasColumnType("date");
                entity.Property(e => e.Breed).HasMaxLength(100).IsUnicode(false);
                entity.Property(e => e.Name).HasMaxLength(100).IsUnicode(false);
                entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");
                entity.Property(e => e.Sex).HasMaxLength(10).IsUnicode(false);
            });
            OnModelCreatingPartial(builder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            if (!builder.IsConfigured)
            {
                builder.UseSqlite(connectionString);
                //builder.UseSqlServer(connectionString);
            }
        }
    }
}
