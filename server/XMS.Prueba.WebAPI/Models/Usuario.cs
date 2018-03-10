using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using XMS.Prueba.WebAPI.Services;

namespace XMS.Prueba.WebAPI.Models
{
    public class Usuario
    {
        [Key]
        public Guid? Id { get; set; }
        
        public string Nombre { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Contrasena
        {
            set
            {
                if (!string.IsNullOrWhiteSpace(value))
                {
                    var res = CryptorPass.HashPassword(value);
                    ContrasenaHash = res.Hash;
                    ContrasenaSalt = res.Salt;
                }
            }
        }

        public string ContrasenaHash { get; protected set; }

        public string ContrasenaSalt { get; protected set; }

        public string Pais { get; set; }
    }
}