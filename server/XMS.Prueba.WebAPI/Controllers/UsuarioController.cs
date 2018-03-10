using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using XMS.Prueba.WebAPI.Data;
using XMS.Prueba.WebAPI.Models;

namespace XMS.Prueba.WebAPI.Controllers
{
    public class UsuarioController : ApiController
    {
        private readonly IRepository<Usuario> _usuarioRepository;

        public UsuarioController(IRepository<Usuario> usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public IEnumerable<Usuario> Get()
        {
            return _usuarioRepository.ListarTodos();
        }
        
        public Usuario Get(Guid id)
        {
            return _usuarioRepository.ObterPorId(id);
        }
        
        [HttpPost]
        [AllowAnonymous]
        public IHttpActionResult Post([FromBody]Usuario usuario)
        {
            var resPais = ValidarPais(usuario.Pais);
            if (resPais != null)
                ModelState.AddModelError("Error", resPais);

            if (ModelState.IsValid)
            {
                _usuarioRepository.Adicionar(usuario);
                return Ok();
            }
            else
                return BadRequest(ModelState);
        }
        
        public IHttpActionResult Put([FromBody]Usuario usuario)
        {
            var resPais = ValidarPais(usuario.Pais);
            if (resPais != null)
                ModelState.AddModelError("Error", resPais);

            if (ModelState.IsValid)
            {
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

        private string ValidarPais(string value)
        {
            if (!string.IsNullOrWhiteSpace(value) && !typeof(Pais).GetFields().Any(p => ((string)p.GetValue(null)) == value))
                return "País inválido";
            else
                return null;
        }
    }
}