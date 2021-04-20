<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class Disciplinas extends Controller
{
    protected function findArquivosDisciplinasDisponiveis()
    {
        $pathInicial = 'database/external/disciplinas/json';
        $diretorio = base_path($pathInicial);
        $disponivel = [];

        $pastas = array_diff(scandir($diretorio), array('..', '.'));

        foreach($pastas as $folder) {
            $path = $diretorio . DIRECTORY_SEPARATOR . $folder;
            $files = array_diff(scandir($path), array('..', '.'));

            foreach($files as $arquivoDisciplina) {
                $idDisciplina = basename($arquivoDisciplina, '.json');
                $disponivel[$idDisciplina] = $path . DIRECTORY_SEPARATOR . $arquivoDisciplina;
            }
        }

        return $disponivel;
    }

    protected function findHistoricoDisciplina($codigo) {
        $stats = DB::connection('dados_uffs')->select("
            SELECT
                sit_turma,
                COUNT(sit_turma) qtd_sit_turma,
                AVG(media_final) avg_media_final,
                AVG(freq_turma) avg_freq_turma,
                ano,
                semestre,
                cod_uffs,
                cod_ccr,
                nome_ccr,
                lista_docentes_ch,
                data_atualizacao
            FROM
                'graduacao_historico/graduacao_historico' as h
            WHERE
                cod_ccr = ?
            GROUP BY
                ano, semestre, sit_turma
            ", [$codigo]);

        $dataset_fields = [
            'sit_turma',
            'qtd_sit_turma',
            'avg_media_final',
            'avg_freq_turma'
        ];

        $info = [
            'lista' => $stats,
            'datasets' => []
        ];

        foreach($stats as $stat) {
            $stat->lista_docentes_ch = json_decode($stat->lista_docentes_ch);

            $date = $stat->ano . '-' . $stat->semestre;

            if(!isset($info['datasets'][$date])) {
                $info['datasets'][$date] = [];
            }

            foreach($dataset_fields as $field) {
                if(!isset($info['datasets'][$date][$field])) {
                    $info['datasets'][$date][$field] = [];
                }

                $info['datasets'][$date][$field][] = $stat->$field == null ? 0 : $stat->$field;
            }
        }

        return $info;
    }

    /**
     * 
     *
     * @return \Illuminate\Http\Response
     */
    public function info($codigo) {
        $dados = DB::connection('dados_uffs')->select("
            SELECT
                cod_ccr AS codigo,
                nome_ccr AS nome,
                cr_ccr AS cr,
                ch_ccr AS ch,
                desc_matriz AS matriz,
                fase_oferta AS fase,
                nome_campus AS campus,
                nome_curso AS curso,
                turno
            FROM
                'graduacao_ccrs_matrizes/graduacao_ccrs_matrizes' as c
            WHERE
                cod_ccr = ?
            GROUP BY
                cod_ccr", [$codigo]);

        if(count($dados) == 0) {
            return abort(404);
        }

        $disciplina = $dados[0];

        $disciplina->historico = $this->findHistoricoDisciplina($codigo);
        $disciplina->ppc = $this->getInfoPccDisciplina($codigo);
        
        return response()->json($disciplina, 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * 
     *
     * @return \Illuminate\Http\Response
     */
    protected function getInfoPccDisciplina($codigo)
    {
        $codigo = strtoupper($codigo);
        $arquivosDisciplinas = $this->findArquivosDisciplinasDisponiveis();
        $codigosDisciplinas = array_keys($arquivosDisciplinas);

        if(!in_array($codigo, $codigosDisciplinas)) {
            return null;
        }

        $pathDisciplina = $arquivosDisciplinas[$codigo];
        $info = json_decode(file_get_contents($pathDisciplina), true);

        unset($info['creditos'],
              $info['codigo'],
              $info['horas'],
              $info['nome']);

        return $info;
    }

    /**
     * 
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function codigos(Request $request)
    {
        $disciplinas = DB::connection('dados_uffs')->select(
            "SELECT cod_ccr FROM 'graduacao_ccrs_matrizes/graduacao_ccrs_matrizes' GROUP BY cod_ccr");
        
        $valores = collect($disciplinas)->map(function($item) {
            return $item->cod_ccr;
        });

        return response()->json($valores, 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * 
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function lista(Request $request)
    {
        $disciplinas = DB::connection('dados_uffs')->select("
            SELECT
                cod_ccr AS codigo,
                nome_ccr AS nome,
                cr_ccr AS cr,
                ch_ccr AS ch,
                desc_matriz AS matriz,
                fase_oferta AS fase,
                nome_campus AS campus,
                nome_curso AS curso,
                turno
            FROM
                'graduacao_ccrs_matrizes/graduacao_ccrs_matrizes' as c
            WHERE
                1
            GROUP BY
                cod_ccr");
        
        return response()->json($disciplinas, 200, [], JSON_NUMERIC_CHECK);
    }
}
