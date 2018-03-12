using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace XMS.Prueba.WebAPI.ViewModels.UsuarioViewModel
{
    public class ObterUsuarioViewModel
    {
        public Guid? Id { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public string Pais { get; set; }
    }
}