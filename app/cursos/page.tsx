'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './cursos.module.css'

interface Curso {
  id: number
  nome: string
  descricao: string
  categoria: string
  duracao: string
  nivel: string
}

const cursosMock: Curso[] = [
  {
    id: 1,
    nome: "React para Iniciantes",
    descricao: "Aprenda os fundamentos do React com projetos práticos",
    categoria: "Frontend",
    duracao: "40 horas",
    nivel: "Iniciante"
  },
  {
    id: 2,
    nome: "Next.js Avançado",
    descricao: "Domine o Next.js com SSR, SSG e API Routes",
    categoria: "Fullstack",
    duracao: "60 horas",
    nivel: "Avançado"
  },
  {
    id: 3,
    nome: "TypeScript Essencial",
    descricao: "Tipo seguro para JavaScript com TypeScript",
    categoria: "Linguagens",
    duracao: "30 horas",
    nivel: "Intermediário"
  },
  {
    id: 4,
    nome: "Node.js Backend",
    descricao: "Construa APIs robustas com Node.js e Express",
    categoria: "Backend",
    duracao: "50 horas",
    nivel: "Intermediário"
  },
  {
    id: 5,
    nome: "CSS Moderno",
    descricao: "Flexbox, Grid e animações CSS avançadas",
    categoria: "Frontend",
    duracao: "25 horas",
    nivel: "Iniciante"
  }
]

export default function CursosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')

  const categorias = [...new Set(cursosMock.map(curso => curso.categoria))]
  const niveis = [...new Set(cursosMock.map(curso => curso.nivel))]

  const cursosFiltrados = cursosMock.filter(curso => {
    const matchSearch = curso.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       curso.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategory = !selectedCategory || curso.categoria === selectedCategory
    const matchLevel = !selectedLevel || curso.nivel === selectedLevel
    
    return matchSearch && matchCategory && matchLevel
  })

  return (
    <div className={styles['cursos-container']}>
      <div className={styles['cursos-content']}>
        {/* Header */}
        <div className={styles['cursos-header']}>
          <Link href="/" className={styles['back-link']}>
            ← Voltar ao início
          </Link>
          <h1 className={styles['cursos-title']}>
            📚 Catálogo de Cursos
          </h1>
          <p className={styles['cursos-subtitle']}>
            Explore nossa coleção de cursos de programação
          </p>
        </div>

        {/* Barra de pesquisa e filtros */}
        <div className={styles['filters-container']}>
          <div className={styles['filters-grid']}>
            <div className={styles['filter-item']}>
              <label className={styles['filter-label']}>
                Buscar cursos
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nome ou descrição do curso..."
                className={styles['filter-input']}
              />
            </div>
            
            <div className={styles['filter-item']}>
              <label className={styles['filter-label']}>
                Categoria
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={styles['filter-select']}
              >
                <option value="">Todas as categorias</option>
                {categorias.map(categoria => (
                  <option key={categoria} value={categoria}>{categoria}</option>
                ))}
              </select>
            </div>
            
            <div className={styles['filter-item']}>
              <label className={styles['filter-label']}>
                Nível
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className={styles['filter-select']}
              >
                <option value="">Todos os níveis</option>
                {niveis.map(nivel => (
                  <option key={nivel} value={nivel}>{nivel}</option>
                ))}
              </select>
            </div>
            
            <div className={styles['filter-item']}>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('')
                  setSelectedLevel('')
                }}
                className={styles['clear-button']}
              >
                Limpar filtros
              </button>
            </div>
          </div>
        </div>

        {/* Lista de cursos */}
        <div className={styles['cursos-grid']}>
          {cursosFiltrados.map(curso => (
            <div key={curso.id} className={styles['curso-card']}>
              <div className={styles['curso-content']}>
                <div className={styles['curso-tags']}>
                  <span className={`${styles['tag']} ${styles['categoria-tag']}`}>
                    {curso.categoria}
                  </span>
                  <span className={`${styles['tag']} ${styles['nivel-tag']} ${styles['nivel-' + curso.nivel.toLowerCase()]}`}>
                    {curso.nivel}
                  </span>
                </div>
                
                <h3 className={styles['curso-nome']}>
                  {curso.nome}
                </h3>
                
                <p className={styles['curso-descricao']}>
                  {curso.descricao}
                </p>
                
                <div className={styles['curso-footer']}>
                  <span className={styles['curso-duracao']}>
                    ⏱️ {curso.duracao}
                  </span>
                  <button className={styles['curso-button']}>
                    Ver detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cursosFiltrados.length === 0 && (
          <div className={styles['no-results']}>
            <p className={styles['no-results-text']}>
              Nenhum curso encontrado com os filtros aplicados.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}