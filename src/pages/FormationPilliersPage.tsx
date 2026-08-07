'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { 
  TrendingUp, 
  Zap, 
  BarChart3, 
  Rocket, 
  Users, 
  ArrowRight,
  BookOpen,
  Clock,
  Star,
  Award,
  Search,
  Filter,
  X
} from "lucide-react";

const formationPilliers = [
  {
    id: 'finance-investment',
    title: 'Finance & Investment',
    description: 'Devenez expert en finance et développez des stratégies d\'investissement performantes',
    icon: TrendingUp,
    color: 'blue',
    bgColor: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700',
    stats: {
      total: 6,
      available: 4,
      students: 1975,
      avgRating: 4.8
    },
    link: '/finance-investment'
  },
  {
    id: 'digital-tools-automation',
    title: 'Outils Digitaux & Automatisation',
    description: 'Automatisez vos processus et boostez votre productivité avec les outils digitaux modernes',
    icon: Zap,
    color: 'maroon',
    bgColor: 'bg-[#800020]',
    hoverColor: 'hover:bg-[#600018]',
    stats: {
      total: 8,
      available: 6,
      students: 2760,
      avgRating: 4.7
    },
    link: '/digital-tools-automation'
  },
  {
    id: 'data-analytics',
    title: 'Data & Analytics',
    description: 'Transformez les données en insights et devenez expert en analyse de données',
    icon: BarChart3,
    color: 'burgundy',
    bgColor: 'bg-[#800020]',
    hoverColor: 'hover:bg-[#600018]',
    stats: {
      total: 9,
      available: 8,
      students: 3750,
      avgRating: 4.8
    },
    link: '/data-analytics'
  },
  {
    id: 'entrepreneurship',
    title: 'Entrepreneuriat',
    description: 'Lancez et développez votre entreprise avec les meilleures stratégies entrepreneuriales',
    icon: Rocket,
    color: 'orange',
    bgColor: 'bg-orange-600',
    hoverColor: 'hover:bg-orange-700',
    stats: {
      total: 8,
      available: 7,
      students: 2530,
      avgRating: 4.7
    },
    link: '/entrepreneurship'
  },
  {
    id: 'soft-skills-leadership',
    title: 'Soft Skills & Leadership',
    description: 'Développez vos compétences relationnelles et devenez un leader inspirant',
    icon: Users,
    color: 'pink',
    bgColor: 'bg-pink-600',
    hoverColor: 'hover:bg-pink-700',
    stats: {
      total: 10,
      available: 9,
      students: 3570,
      avgRating: 4.7
    },
    link: '/soft-skills-leadership'
  }
];

export default function FormationPilliersPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-cover bg-center bg-no-repeat pt-32 pb-20" style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=600&fit=crop")' 
        }}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90"></div>
          <div className="relative container mx-auto px-4 pt-20 pb-12 lg:pt-24 lg:pb-16 lg:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl tracking-tight lg:text-6xl tracking-tight font-bold mb-6 text-white font-montserrat">
                Nos Piliers de Formation
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
                Découvrez nos 5 piliers d'excellence pour développer vos compétences et booster votre carrière
              </p>
              
              {/* Stats Globales */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <div className="text-center bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="text-3xl tracking-tight font-bold text-white mb-2">40</div>
                  <div className="text-sm text-white/80">Formations</div>
                </div>
                <div className="text-center bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="text-3xl tracking-tight font-bold text-white mb-2">34</div>
                  <div className="text-sm text-white/80">Disponibles</div>
                </div>
                <div className="text-center bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="text-3xl tracking-tight font-bold text-white mb-2">14.5k</div>
                  <div className="text-sm text-white/80">Apprenants</div>
                </div>
                <div className="text-center bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="text-3xl tracking-tight font-bold text-white mb-2">4.7</div>
                  <div className="text-sm text-white/80">Note moyenne</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Piliers Grid */}
        <section className="container mx-auto px-4 py-16 lg:py-24">
          <div className="mb-12">
            <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-4 text-center">
              Explorez Nos Piliers de Formation
            </h2>
            <p className="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto leading-relaxed">
              Choisissez le domaine qui correspond à vos objectifs professionnels et commencez votre apprentissage
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formationPilliers.map((pilier, index) => (
              <motion.div
                key={pilier.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group"
              >
                <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 ${pilier.color === 'blue' ? 'border-blue-100' : pilier.color === 'maroon' ? 'border-[#800020]/20' : pilier.color === 'orange' ? 'border-orange-100' : pilier.color === 'pink' ? 'border-pink-100' : 'border-gray-100'}`}>
                  {/* Header */}
                  <div className={`${pilier.bgColor} p-6 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 backdrop-blur-sm"></div>
                    <div className="relative z-10">
                      <pilier.icon className="w-12 h-12 mb-4 leading-relaxed" />
                      <h3 className="text-2xl font-bold mb-3">{pilier.title}</h3>
                      <p className="text-white/90 mb-6 line-clamp-3 leading-relaxed">{pilier.description}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="p-6 bg-gray-50">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-1">{pilier.stats.total}</div>
                        <div className="text-sm text-gray-600">Formations</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-1">{pilier.stats.available}</div>
                        <div className="text-sm text-gray-600">Disponibles</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-1">{pilier.stats.students.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Apprenants</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-1">{pilier.stats.avgRating}</div>
                        <div className="text-sm text-gray-600">Note moyenne</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="p-6 bg-white border-t border-gray-100">
                    <button
                      onClick={() => navigate(pilier.link)}
                      className={`w-full flex items-center justify-center gap-2 px-6 py-3 ${pilier.bgColor} text-white rounded-2xl font-semibold transition-colors ${pilier.hoverColor}`}
                    >
                      Explorer les formations
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
