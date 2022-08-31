using Microsoft.AspNetCore.Mvc;
using ProjetoIntegrador.Models;
 
namespace ProjetoIntegrador.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class AvaliacaoController : ControllerBase
    {
        private BDContexto contexto;
 
        public AvaliacaoController(BDContexto bdContexto)
        {
            contexto = bdContexto;
        }
 
        [HttpGet]
        public List<Avaliacao> Listar()
        {
            return contexto.Avaliacaos.ToList();
        }



        [HttpGet("{id}")]
        public Avaliacao Visualizar(int id)
        {
            return contexto.Avaliacaos.FirstOrDefault();
        }



        [HttpPost]

        public string Enviar([FromBody] Avaliacao novoAvalicao)
        {
            contexto.Add(novoAvalicao);
            contexto.SaveChanges();
            return "Avaliação enviada com sucesso!";
        }

        

        [HttpDelete("{id}")]
        public string Excluir(int id)
        {
            Avaliacao dados = contexto.Avaliacaos.FirstOrDefault(p => p.Id == id);

            if (dados == null)
            {
                return "Não foi encontrado a Avaliação para o ID informado";
            }
            else
            {
                contexto.Remove(dados);
                contexto.SaveChanges();

                return "Avaliação removida com sucesso!"; 
            }
        }
    }
}