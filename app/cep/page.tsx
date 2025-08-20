'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './cep.module.css'

interface CepData {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

export default function CepPage() {
  const [cep, setCep] = useState('')
  const [cepData, setCepData] = useState<CepData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const buscarCep = async () => {
    if (!cep || cep.length !== 8) {
      setError('Por favor, digite um CEP válido com 8 dígitos')
      return
    }

    setLoading(true)
    setError('')
    setCepData(null)

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json`)
      const data = await response.json()

      if (data.erro) {
        setError('CEP não encontrado')
      } else {
        setCepData(data)
      }
    } catch (err) {
      setError('Erro ao buscar CEP. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles['cep-container']}>
      <div className={styles['cep-content']}>
        {/* Header */}
        <div className={styles['cep-header']}>
          <Link href="/" className={styles['back-link']}>
            ← Voltar ao início
          </Link>
          <h1 className={styles['cep-title']}>
            🔍 Busca de CEP
          </h1>
          <p className={styles['cep-subtitle']}>
            Digite um CEP para encontrar o endereço completo
          </p>
        </div>

        {/* Barra de pesquisa */}
        <div className={styles['search-container']}>
          <div className={styles['search-form']}>
            <input
              type="text"
              value={cep}
              onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
              placeholder="Digite o CEP (apenas números)"
              className={styles['cep-input']}
              maxLength={8}
            />
            <button
              onClick={buscarCep}
              disabled={loading}
              className={styles['search-button']}
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
          
          {error && (
            <p className={styles['error-message']}>{error}</p>
          )}
        </div>

        {/* Resultados */}
        {cepData && (
          <div className={styles['results-container']}>
            <h2 className={styles['results-title']}>
              Resultado da busca
            </h2>
            <div className={styles['results-grid']}>
              <div className={styles['result-item']}>
                <label className={styles['result-label']}>CEP</label>
                <p className={styles['result-value']}>{cepData.cep}</p>
              </div>
              <div className={styles['result-item']}>
                <label className={styles['result-label']}>Logradouro</label>
                <p className={styles['result-value']}>{cepData.logradouro}</p>
              </div>
              <div className={styles['result-item']}>
                <label className={styles['result-label']}>Bairro</label>
                <p className={styles['result-value']}>{cepData.bairro}</p>
              </div>
              <div className={styles['result-item']}>
                <label className={styles['result-label']}>Cidade</label>
                <p className={styles['result-value']}>{cepData.localidade}</p>
              </div>
              <div className={styles['result-item']}>
                <label className={styles['result-label']}>Estado</label>
                <p className={styles['result-value']}>{cepData.uf}</p>
              </div>
              {cepData.complemento && (
                <div className={styles['result-item']}>
                  <label className={styles['result-label']}>Complemento</label>
                  <p className={styles['result-value']}>{cepData.complemento}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
