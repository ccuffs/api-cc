<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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

        ksort($course);

        return $course;
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
