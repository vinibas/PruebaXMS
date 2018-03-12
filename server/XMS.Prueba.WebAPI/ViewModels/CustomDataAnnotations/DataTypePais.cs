using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using XMS.Prueba.WebAPI.Models;

namespace XMS.Prueba.WebAPI.ViewModels.CustomDataAnnotations
{
    public class DataTypePais : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            return ValidarPais(value as string);
        }

        private bool ValidarPais(string pais)
        {
            return pais == null || typeof(Pais).GetFields().Any(p => ((string)p.GetValue(null)) == pais);
        }
    }
}