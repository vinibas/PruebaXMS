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
        public Guid Id { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
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
        public string ContrasenaHash { get; private set; }
        public string ContrasenaSalt { get; private set; }

        public string Pais { get; set; }
    }
}