using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace XMS.Prueba.WebAPI.Data
{
    public interface IRepository<T> : IDisposable
    {
        IEnumerable<T> ListarTodos();

        T ObterPorId(Guid id);

        int Adicionar(T entidade);

        void Editar(T entidade);

        void Excluir(Guid id);
    }
}
