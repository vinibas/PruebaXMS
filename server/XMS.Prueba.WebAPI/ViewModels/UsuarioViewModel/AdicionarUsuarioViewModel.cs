using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using XMS.Prueba.WebAPI.Services;
using XMS.Prueba.WebAPI.ViewModels.CustomDataAnnotations;

namespace XMS.Prueba.WebAPI.ViewModels.UsuarioViewModel
{
    public class AdicionarUsuarioViewModel
    {
        [MaxLength(100, ErrorMessage = "El usuario no puede tener más de 100 caracteres.")]
        public string Nombre { get; set; }
        
        [Required(ErrorMessage = "El e-mail es obligatorio")]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "La contraseña es obligatoria")]
        [DataType(DataType.Password)]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "La contraseña debe tener entre 3 y 100 caracteres.")]
        public string Contrasena { get; set; }

        [DataTypePais(ErrorMessage = "País inválido")]
        public string Pais { get; set; }
    }
}