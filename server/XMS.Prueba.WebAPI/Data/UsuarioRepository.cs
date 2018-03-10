using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using XMS.Prueba.WebAPI.Models;

namespace XMS.Prueba.WebAPI.Data
{
    public class UsuarioRepository : IRepository<Usuario>
    {
        private readonly PruebaDbContext _pruebaDbContext;
        private readonly DbSet<Usuario> DbSetUsuario;

        public UsuarioRepository(PruebaDbContext pruebaDbContext)
        {
            _pruebaDbContext = pruebaDbContext;
            DbSetUsuario = _pruebaDbContext.Set<Usuario>();
        }

        public IEnumerable<Usuario> ListarTodos()
        {
            return DbSetUsuario.ToList();
        }
        
        public Usuario ObterPorId(Guid id)
        {
            return DbSetUsuario.Find(id);
        }

        public int Adicionar(Usuario usuario)
        {
            usuario.Id = Guid.NewGuid();

            DbSetUsuario.Add(usuario);
            return _pruebaDbContext.SaveChanges();
        }
        
        public void Editar(Usuario usuario)
        {
            var entry = _pruebaDbContext.Entry(usuario);

            DbSetUsuario.Attach(usuario);
            entry.State = EntityState.Modified;

            if (usuario.ContrasenaHash == null || usuario.ContrasenaSalt == null)
            {
                entry.Property(p => p.ContrasenaHash).IsModified = false;
                entry.Property(p => p.ContrasenaSalt).IsModified = false;
            }
            
            _pruebaDbContext.SaveChanges();
            
        }

        public void Excluir(Guid id)
        {
            DbSetUsuario.Remove(DbSetUsuario.Find(id));
            _pruebaDbContext.SaveChanges();
        }

        public void Dispose()
            => _pruebaDbContext.Dispose();

    }
}