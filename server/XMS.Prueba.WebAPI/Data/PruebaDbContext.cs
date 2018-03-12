using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;
using XMS.Prueba.WebAPI.Models;

namespace XMS.Prueba.WebAPI.Data
{
    public class PruebaDbContext : DbContext
    {
        public PruebaDbContext() : base("DefaultConnection")
        { }

        public DbSet<Usuario> Usuarios { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            modelBuilder.Conventions.Remove<ManyToManyCascadeDeleteConvention>();
            
            // Generic
            modelBuilder.Properties<string>()
                .Configure(p => p.HasColumnType("varchar"));

            modelBuilder.Properties<Guid>()
                .Where(p => p.Name == "Id")
                .Configure(p => p.IsKey());

            // Usuario
            var mbUsuario = modelBuilder.Entity<Usuario>();
            mbUsuario.Property(p => p.Nombre).HasMaxLength(100);
            mbUsuario.Property(p => p.Email).IsRequired();
            mbUsuario.Property(p => p.Pais).HasMaxLength(2).IsFixedLength();
        }
    }
}