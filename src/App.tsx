/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BookOpen, 
  Target, 
  Settings, 
  ChevronRight, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  BarChart3, 
  Layers,
  ArrowRightCircle,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types & Data ---

interface CaseStudy {
  id: string;
  title: string;
  context: string;
  questions: string[];
  solution: string;
}

interface TopicData {
  id: string;
  title: string;
  subtitle: string;
  theory: {
    section: string;
    content: string[];
  }[];
  examples: string[];
  cases: CaseStudy[];
}

const STUDY_DATA: TopicData[] = [
  {
    id: 'sourcing',
    title: 'Semana 2: Sourcing Estratégico',
    subtitle: 'El "Qué" y "Cómo" del Abastecimiento',
    theory: [
      {
        section: 'Definición de Sourcing Estratégico',
        content: [
          'Es un proceso sistemático para determinar el mejor costo total de compra (TCO).',
          'Busca alianzas estratégicas para mantener o mejorar los niveles de servicio.',
          'Enfoque analítico orientado a alcanzar el valor a través de la estandarización.'
        ]
      },
      {
        section: 'Los 4 Principios Claves',
        content: [
          'Principio 1: Definir el valor total de la relación (TCO).',
          'Principio 2: Desarrollar soluciones basadas en la economía de los proveedores.',
          'Principio 3: Coincidir la estrategia con la categoría de compra.',
          'Principio 4: Integrar cambios para mejora continua.'
        ]
      },
      {
        section: 'Componentes del TCO (Costo Total de Propiedad)',
        content: [
          'Previos a la transacción: Identificación de necesidad, investigación de recursos.',
          'De la transacción: Precio, transporte, aranceles, facturación.',
          'Posteriores a la transacción: Fallas, mantenimiento, reparaciones, reputación.'
        ]
      }
    ],
    examples: [
      'Uso de la Matriz de Kraljic para clasificar tornillos (No críticos) vs. Aceros especiales (Estratégicos).',
      'Consolidación de compras de oficina de 10 sedes en un solo proveedor global para obtener economías de escala.'
    ],
    cases: [
      {
        id: 'c1',
        title: 'Caso: Neumáticos OTR en Minería',
        context: 'Una minera gasta el 40% de su presupuesto en neumáticos OTR. Solo hay 2 proveedores globales confiables. Si falta este insumo, la producción se detiene por completo.',
        questions: [
          '¿Cómo clasificaría este insumo en la Matriz de Kraljic?',
          '¿Qué estrategia de sourcing aplicaría para mitigar riesgos?'
        ],
        solution: 'Clasificación: Ítem Estratégico (Alto impacto financiero y alto riesgo de suministro). Estrategia: Alianzas a largo plazo, desarrollo de proveedores compartiendo riesgos e innovación en la vida útil del neumático.'
      }
    ]
  },
  {
    id: 'gestion-estrategica',
    title: 'Semana 4: Gestión Estratégica',
    subtitle: 'Decisiones de Alto Nivel y Riesgo',
    theory: [
      {
        section: 'Niveles de Planeación',
        content: [
          'Corporativo: Determina en qué negocios estamos.',
          'Unidad de Negocio: Decisiones que moldean los planes de una unidad específica.',
          'Funcional: Cómo contribuye cada área (ej. Compras) a la aplicación de recursos.'
        ]
      },
      {
        section: 'Decisión Hacer vs. Comprar',
        content: [
          'Hacer (Integración Vertical): Cuando hay poca oferta o se quiere proteger tecnología propia.',
          'Comprar (Outsourcing): Cuando hay fuerte competencia en el mercado y es más eficiente la escala del tercero.'
        ]
      },
      {
        section: 'Administración del Riesgo',
        content: [
          'Operativo: Interrupciones o demoras del suministro (desastres, huelgas).',
          'Financiero: Cambios de precio, variaciones en divisas.',
          'Reputación: Aspectos éticos, sobornos, mala calidad que afecta la marca.'
        ]
      }
    ],
    examples: [
      'Una empresa de tecnología decide "Hacer" su propio procesador para diferenciarse de la competencia.',
      'Análisis de riesgo ante una huelga portuaria: activación de plan de contingencia con transporte aéreo.'
    ],
    cases: [
      {
        id: 'c2',
        title: 'Caso: Empresa Ferroviaria',
        context: 'La gerencia se pregunta: ¿Estamos en el negocio de operar trenes o en el negocio del movimiento de personas y cosas?',
        questions: [
          '¿A qué nivel de planeación estratégica corresponde esta pregunta?',
          '¿Cómo afecta esto a la gestión de compras?'
        ],
        solution: 'Nivel Corporativo. Afecta la gestión de compras porque si el enfoque es el "movimiento", se podrían externalizar (comprar) servicios de mantenimiento y limpieza, en lugar de gestionar activos físicos internamente.'
      }
    ]
  },
  {
    id: 'gestion-tactica',
    title: 'Semana 4: Gestión Táctica',
    subtitle: 'Operatividad y Reabastecimiento',
    theory: [
      {
        section: 'Sistemas de Reabastecimiento',
        content: [
          'EOQ (Lote Óptimo): Nivela costos de emisión de órdenes y costos de mantenimiento.',
          'Revisión Periódica: Inventario se revisa en intervalos fijos (manual o por sistema).',
          'Revisión Continua: Se solicita cuando el nivel llega al punto de reorden (ROP).'
        ]
      },
      {
        section: 'Tipos de Suministros Modernos',
        content: [
          'JIT (Just in Time): Cantidad mínima en el último momento posible.',
          'VMI (Vendor Managed Inventory): El proveedor gestiona el stock del cliente basándose en demanda compartida.',
          'Consignación: El stock está en el cliente, pero el pago se hace al momento del uso.'
        ]
      }
    ],
    examples: [
      'Cálculo de EOQ para una distribuidora de botellas que tiene una demanda anual de 12,000 unidades.',
      'Implementación de VMI en una cadena de farmacias para artículos de alta rotación.'
    ],
    cases: [
      {
        id: 'c3',
        title: 'Caso: El Lote Económico',
        context: 'Una fábrica de repuestos tiene un costo de emitir orden de $50, una demanda de 2,400 unidades/año y un costo de mantenimiento de $2 por unidad por año.',
        questions: [
          '¿Cuál es el lote óptimo (EOQ)?',
          'Si el proveedor solo vende en múltiplos de 500, ¿qué decisión tomaría?'
        ],
        solution: '1. EOQ = sqrt((2 * 2400 * 50) / 2) = sqrt(120,000) ≈ 346 unidades. 2. Dado que el óptimo es 346 y el proveedor pide 500, se debe evaluar si el descuento por volumen compensa el incremento en el costo de mantenimiento por exceso de stock.'
      }
    ]
  }
];

// --- Components ---

const CaseCard = ({ caseData }: { caseData: CaseStudy }) => {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800">{caseData.title}</h3>
        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
          Nivel Examen
        </span>
      </div>
      <p className="text-slate-600 text-sm italic mb-4 border-l-4 border-indigo-500 pl-4">
        "{caseData.context}"
      </p>
      <div className="space-y-2 mb-6">
        {caseData.questions.map((q, idx) => (
          <div key={idx} className="flex gap-2 items-start">
            <span className="text-indigo-500 font-bold text-xs mt-1">{String.fromCharCode(65 + idx)})</span>
            <p className="text-sm font-medium text-slate-700">{q}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-dashed border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Análisis y Respuesta</span>
          <button 
            onClick={() => setShowSolution(!showSolution)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 active:scale-95 transition-all"
          >
            {showSolution ? <EyeOff size={14} /> : <Eye size={14} />}
            {showSolution ? 'OCULTAR RESPUESTA' : 'REVELAR RESPUESTA'}
          </button>
        </div>
        
        <AnimatePresence>
          {showSolution && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-sm text-slate-700 leading-relaxed">
                <div className="flex gap-2 mb-2">
                  <CheckCircle2 size={16} className="text-indigo-500 shrink-0 mt-0.5" />
                  <span className="font-bold text-indigo-700">Solución Exitosa:</span>
                </div>
                {caseData.solution}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!showSolution && (
          <div className="h-16 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/30">
            <p className="text-[10px] font-bold text-slate-300 tracking-tighter uppercase italic">Resuelve mentalmente antes de ver la respuesta</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [activeTopicId, setActiveTopicId] = useState(STUDY_DATA[0].id);
  const activeTopic = STUDY_DATA.find(t => t.id === activeTopicId) || STUDY_DATA[0];

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 overflow-hidden text-slate-900 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <BookOpen size={20} />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight uppercase leading-tight">Logistics Prep Master</h1>
            <p className="text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase">Examen Parcial • UTEC</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Meta Personal</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-indigo-600 leading-none">20</span>
              <span className="text-sm font-bold text-slate-300">/ 20</span>
            </div>
          </div>
          <div className="h-10 w-px bg-gray-100"></div>
          <div className="flex flex-col gap-1 w-32">
            <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
              <span>Progreso</span>
              <span>65%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '65%' }}
                className="h-full bg-indigo-500 rounded-full"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar Nav */}
        <aside className="w-72 bg-white border-r border-gray-100 flex flex-col p-6 overflow-y-auto">
          <nav className="flex flex-col gap-2">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">Temas del Examen</p>
            {STUDY_DATA.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActiveTopicId(topic.id)}
                className={`flex items-center gap-3 p-3 rounded-2xl text-left transition-all group ${
                  activeTopicId === topic.id 
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <div className={`w-2 h-2 rounded-full transition-transform group-hover:scale-125 ${
                  activeTopicId === topic.id ? 'bg-indigo-500' : 'bg-slate-300'
                }`} />
                <span className="text-xs font-bold leading-tight">{topic.title}</span>
              </button>
            ))}
          </nav>

          <div className="mt-12">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">Herramientas</p>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 rounded-2xl bg-white border border-gray-100 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                <span className="flex items-center gap-3"><Settings size={14} /> Ajustes Study Mode</span>
                <ChevronRight size={12} className="text-slate-300" />
              </button>
            </div>
          </div>

          <div className="mt-auto pt-8">
            <div className="bg-slate-900 rounded-3xl p-5 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150" />
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={16} className="text-indigo-400" />
                <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Tip del Día</p>
              </div>
              <p className="text-xs leading-relaxed opacity-90 italic">
                "En la Gestión Táctica, la calidad no es negociable; el costo se optimiza mediante la eficiencia."
              </p>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <section className="flex-1 flex flex-col p-8 overflow-y-auto bg-slate-50/50 scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTopicId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl mx-auto w-full space-y-8"
            >
              {/* Topic Hero */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                    {activeTopic.title.split(': ')[0]}<br/>
                    <span className="text-indigo-600">{activeTopic.title.split(': ')[1]}</span>
                  </h2>
                  <p className="text-slate-500 font-medium text-sm">{activeTopic.subtitle}</p>
                </div>
                <div className="hidden md:flex gap-4">
                  <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm text-center min-w-[100px]">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Conceptos</p>
                    <p className="text-xl font-black text-slate-800">10+</p>
                  </div>
                  <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm text-center min-w-[100px]">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Casos</p>
                    <p className="text-xl font-black text-slate-800">{activeTopic.cases.length}</p>
                  </div>
                </div>
              </div>

              {/* Theory Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <h4 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                    <BookOpen size={12} /> Resumen Teórico
                  </h4>
                  {activeTopic.theory.map((item, idx) => (
                    <div key={idx} className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:translate-y-[-2px] transition-all">
                      <h5 className="font-bold text-slate-800 mb-3 text-sm flex items-center gap-2">
                        <Target size={14} className="text-indigo-500" /> {item.section}
                      </h5>
                      <ul className="space-y-2">
                        {item.content.map((point, pIdx) => (
                          <li key={pIdx} className="flex gap-2 text-xs text-slate-600 leading-relaxed">
                            <ArrowRightCircle size={12} className="shrink-0 mt-0.5 text-slate-300" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                   <h4 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                    <BarChart3 size={12} /> Ejemplos Rápidos
                  </h4>
                  <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-100 space-y-4">
                    {activeTopic.examples.map((example, idx) => (
                      <div key={idx} className="flex gap-4 items-start">
                        <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                          <Layers size={16} />
                        </div>
                        <p className="text-sm font-medium leading-relaxed italic">
                          "{example}"
                        </p>
                      </div>
                    ))}
                  </div>

                  <h4 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 pt-2">
                    <Settings size={12} /> Casos Resueltos (Práctica)
                  </h4>
                  {activeTopic.cases.map(caseItem => (
                    <CaseCard key={caseItem.id} caseData={caseItem} />
                  ))}

                  <div className="bg-amber-50 border border-amber-100 rounded-3xl p-5 flex gap-4">
                    <div className="p-3 bg-amber-500 rounded-2xl text-white h-fit">
                      <AlertTriangle size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest mb-1">Tip de Examen</p>
                      <p className="text-xs text-amber-800 leading-relaxed">
                        Presta atención a la diferencia entre **Sourcing** (estrategia) y **Compras** (táctica). Es una pregunta clásica.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <footer className="mt-12 pt-8 border-t border-gray-100 text-center max-w-4xl mx-auto w-full pb-8 italic">
            <p className="text-slate-400 text-[10px] font-medium tracking-widest">
              DISEÑADO PARA OBTENER UN 20 • UTEC PARCIAL PREP
            </p>
          </footer>
        </section>
      </main>
    </div>
  );
}
