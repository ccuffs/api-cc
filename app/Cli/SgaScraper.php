<?php

namespace App\Cli;

use Illuminate\Support\Facades\Log;

/**
 * 
 */
class SgaScraper
{
    protected array $config;
    protected array $requests;

    public function __construct($config)
    {
        $this->config = $config;
    }

    protected function runCli(array $args = [])
    {
        $output = null;
        $code = null;
        
        exec('whoami', $output, $code);

        return collect($output);
    }

    protected function runRequests($requests)
    {
        if (count($requests) == 0 || !isset($requests['pedidos'])) {
            throw 'Lista de comandos está vazia. Use sga()->usando()->...->get()';
        }

        if (!isset($requests['credenciais'])) {
            throw 'Credenciais de acesso não informadas. Use sga()->usando()->...';
        }

        $this->runCli();
    }

    public function usando(array $credenciais)
    {
        if (!isset($credenciais['usuario'])) {
            throw 'Nenhum usuário informado nas credenciais.';
        }

        if (!isset($credenciais['senha'])) {
            throw 'Nenhuma senha informada nas credenciais.';
        }

        $this->requests['credenciais'] = [
            'usuario' => $credenciais['usuario'],
            'senha' => $credenciais['senha'],
        ];

        if (isset($credenciais['matricula'])) {
            $this->requests['credenciais']['matricula'] = $credenciais['matricula'];
        }

        return $this;
    }

    protected function pushPedido($nome)
    {
        if (!isset($this->requests['pedidos'])) {
            $this->requests['pedidos'] = [];
        }

        $this->requests['pedidos'][] = $nome;
    }

    public function alunos()
    {
        $this->pushPedido('--alunos');
        return $this;
    }

    public function conclusoes()
    {
        $this->pushPedido('--conclusoes');
        return $this;
    }


    public function historico()
    {
        $this->pushPedido('--historico');
        return $this;
    }

    public function get()
    {
        $result = $this->runRequests($this->requests);
        $this->requests = [];

        return $result;
    }
}