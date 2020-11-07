<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class Disciplinas extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {
        // This controller is open to the inter-webz.
    }

    protected function findAvailableCourseFiles()
    {
        $origin_path = 'database/external/disciplinas/json';
        $directory = base_path($origin_path);
        $available = [];

        $folders = array_diff(scandir($directory), array('..', '.'));

        foreach($folders as $folder) {
            $path = $directory . DIRECTORY_SEPARATOR . $folder;
            $files = array_diff(scandir($path), array('..', '.'));

            foreach($files as $course_file) {
                $course_id = basename($course_file, '.json');
                $available[$course_id] = $path . DIRECTORY_SEPARATOR . $course_file;
            }
        }

        return $available;
    }

    protected function findCourseHistory($id) {
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
        ", [$id]);

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
    public function get($id)
    {
        $normalized_id = strtoupper($id);
        $available_course_files = $this->findAvailableCourseFiles();
        $available_course_ids = array_keys($available_course_files);

        if(!in_array($normalized_id, $available_course_ids)) {
            return response()->json([
                'message' => 'Disciplina não encontrada',
                'errors' => [
                    'general' => ["A disciplina de código '$normalized_id' não foi encontrada."]
                ]
            ]);
        }

        $course_path = $available_course_files[$normalized_id];
        $course = json_decode(file_get_contents($course_path), true);

        $history = $this->findCourseHistory($id);
        $course['historico'] = $history;

        ksort($course);

        return response()->json($course, 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * 
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $available_course_files = $this->findAvailableCourseFiles();
        $course_ids = array_keys($available_course_files);

        return $course_ids;
    }
}
