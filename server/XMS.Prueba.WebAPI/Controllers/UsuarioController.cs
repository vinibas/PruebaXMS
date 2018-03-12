using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using XMS.Prueba.WebAPI.Data;
using XMS.Prueba.WebAPI.Models;
using XMS.Prueba.WebAPI.ViewModels.UsuarioViewModel;

namespace XMS.Prueba.WebAPI.Controllers
{
    public class UsuarioController : ApiController
    {
        private readonly IRepository<Usuario> _usuarioRepository;

        public UsuarioController(IRepository<Usuario> usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public IEnumerable<ObterUsuarioViewModel> Get()
        {
            return _usuarioRepository.ListarTodos().Select(p => new ObterUsuarioViewModel
            {
                Id = p.Id,
                Nombre = p.Nombre,
                Email = p.Email,
                Pais = p.Pais
            });
        }
        
        public ObterUsuarioViewModel Get(Guid id)
        {
            var usuario = _usuarioRepository.ObterPorId(id);
            ObterUsuarioViewModel vm = null;

            if (usuario != null)
                vm = new ObterUsuarioViewModel
                {
                    Id = usuario.Id,
                    Nombre = usuario.Nombre,
                    Email = usuario.Email,
                    Pais = usuario.Pais
                };


            return vm;
        }
        
        [HttpPost]
        [AllowAnonymous]
        public IHttpActionResult Post([FromBody]AdicionarUsuarioViewModel vm)
        {
            if (ModelState.IsValid)
            {
                var usuario = new Usuario
                {
                    Nombre = vm.Nombre,
                    Email = vm.Email,
                    Contrasena = vm.Contrasena,
                    Pais = vm.Pais
                };
                _usuarioRepository.Adicionar(usuario);

                return Ok();
            }
            else
                return BadRequest(ModelState);
        }
        
        public IHttpActionResult Put([FromBody]EditarUsuarioViewModel vm)
        {
            if (ModelState.IsValid)
            {
                var usuario = new Usuario
                {
                    Id = vm.Id.Value,
                    Nombre = vm.Nombre,
                    Email = vm.Email,
                    Contrasena = vm.Contrasena,
                    Pais = vm.Pais
                };
                _usuarioRepository.Editar(usuario);

                return Ok(new { success = true });
            }
            else
                return BadRequest(ModelState);
        }
        
        public IHttpActionResult Delete(Guid id)
        {
            try
            {
                _usuarioRepository.Excluir(id);
                return Ok(new { success = true });
            }
            catch
            {
                return BadRequest(ModelState);
            }
        }

    }
}