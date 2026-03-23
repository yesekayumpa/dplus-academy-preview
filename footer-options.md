# Option 1: Footer Moderne & Minimaliste
```tsx
<footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Logo et Description */}
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center mb-4">
          <img className="h-12 w-auto mr-3" src="/Copie de LOGOTYPE [Récupéré]-18.png" alt="DMPLUS ACADEMY" />
          <h3 className="text-xl font-bold">DM + Academy</h3>
        </div>
        <p className="text-gray-300 leading-relaxed mb-4">
          Formation professionnelle en design graphique pour transformer votre créativité en carrière.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Liens Rapides */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Formations</h4>
        <ul className="space-y-2">
          <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Design Graphique</a></li>
          <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Marketing Digital</a></li>
          <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Développement Web</a></li>
          <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Certifications</a></li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Contact</h4>
        <div className="space-y-3">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <a href="mailto:academy@dmplus-group.com" className="text-gray-300 hover:text-white transition-colors">academy@dmplus-group.com</a>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <span className="text-gray-300">+221 33 829 58 79</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.496.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 9.89-5.335 9.89-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <a href="https://wa.me/221766638219" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>
    </div>

    {/* Barre du bas */}
    <div className="border-t border-gray-700 mt-8 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm">© 2025 DIGITAL MIND PLUS ACADEMY. Tous droits réservés.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Mentions Légales</a>
          <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Confidentialité</a>
          <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">CGV</a>
        </div>
      </div>
    </div>
  </div>
</footer>
```

# Option 2: Footer Élégant avec Cartes
```tsx
<footer className="bg-gradient-to-br from-red-50 to-gray-50 border-t border-gray-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    {/* Section principale */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      
      {/* Carte À Propos */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-3">
            <img className="h-8 w-auto" src="/Copie de LOGOTYPE [Récupéré]-18.png" alt="DMPLUS ACADEMY" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">DM + Academy</h3>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Leader de la formation professionnelle en Afrique, nous transformons vos ambitions en compétences concrètes.
        </p>
        <div className="flex space-x-3">
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Certifié</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Qualité</span>
        </div>
      </div>

      {/* Carte Contact */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Rapide</h3>
        <div className="space-y-3">
          <a href="mailto:academy@dmplus-group.com" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors group">
            <svg className="w-5 h-5 text-red-600 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span className="text-gray-700 group-hover:text-red-700 transition-colors">academy@dmplus-group.com</span>
          </a>
          <a href="tel:+221338295879" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors group">
            <svg className="w-5 h-5 text-red-600 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <span className="text-gray-700 group-hover:text-red-700 transition-colors">+221 33 829 58 79</span>
          </a>
          <a href="https://wa.me/221766638219" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors group">
            <svg className="w-5 h-5 text-green-600 mr-3 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.496.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 9.89-5.335 9.89-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span className="text-gray-700 group-hover:text-green-700 transition-colors">WhatsApp Chat</span>
          </a>
        </div>
      </div>

      {/* Carte Liens Utiles */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Liens Utiles</h3>
        <div className="grid grid-cols-2 gap-3">
          <a href="#" className="text-gray-600 hover:text-red-600 transition-colors text-sm">Formations</a>
          <a href="#" className="text-gray-600 hover:text-red-600 transition-colors text-sm">Certifications</a>
          <a href="#" className="text-gray-600 hover:text-red-600 transition-colors text-sm">Carrières</a>
          <a href="#" className="text-gray-600 hover:text-red-600 transition-colors text-sm">Blog</a>
          <a href="#" className="text-gray-600 hover:text-red-600 transition-colors text-sm">Témoignages</a>
          <a href="#" className="text-gray-600 hover:text-red-600 transition-colors text-sm">Partenaires</a>
          <a href="#" className="text-gray-600 hover:text-red-600 transition-colors text-sm">FAQ</a>
          <a href="#" className="text-gray-600 hover:text-red-600 transition-colors text-sm">Support</a>
        </div>
      </div>
    </div>

    {/* Barre inférieure */}
    <div className="border-t border-gray-200 pt-8">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div className="text-center lg:text-left mb-4 lg:mb-0">
          <p className="text-gray-500 text-sm">© 2025 DIGITAL MIND PLUS ACADEMY</p>
          <p className="text-gray-400 text-xs mt-1">Ce site ne fait pas partie du site web Facebook ou de Facebook, Inc. ni de Google Inc.</p>
        </div>
        <div className="flex space-x-6 text-sm">
          <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">Mentions Légales</a>
          <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">Confidentialité</a>
          <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">CGU</a>
        </div>
      </div>
    </div>
  </div>
</footer>
```

# Option 3: Footer Premium avec Sections Multiples
```tsx
<footer className="bg-gradient-to-b from-gray-900 to-black text-white">
  {/* Newsletter Section */}
  <div className="bg-gradient-to-r from-red-600 to-red-700 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h3 className="text-2xl font-bold mb-2">Restez Informé</h3>
          <p className="text-red-100">Recevez nos dernières formations et offres exclusives</p>
        </div>
        <div className="flex space-x-3">
          <input type="email" placeholder="Votre email" className="px-4 py-3 rounded-lg text-gray-900 w-64 focus:outline-none focus:ring-2 focus:ring-white"/>
          <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            S'inscrire
          </button>
        </div>
      </div>
    </div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      
      {/* Brand */}
      <div className="lg:col-span-1">
        <div className="flex items-center mb-4">
          <img className="h-10 w-auto mr-3" src="/Copie de LOGOTYPE [Récupéré]-18.png" alt="DMPLUS ACADEMY" />
          <h3 className="text-xl font-bold">DM + Academy</h3>
        </div>
        <p className="text-gray-400 mb-6 leading-relaxed">
          Excellence dans la formation professionnelle depuis 2020. Plus de 10,000 étudiants formés.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
          <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Formations */}
      <div>
        <h4 className="text-lg font-semibold mb-6 text-white">Formations</h4>
        <ul className="space-y-3">
          <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
            <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
            Design Graphique Complet
          </a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
            <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
            Marketing Digital
          </a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
            <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
            Développement Web
          </a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
            <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
            Business Intelligence
          </a></li>
        </ul>
      </div>

      {/* Support */}
      <div>
        <h4 className="text-lg font-semibold mb-6 text-white">Support</h4>
        <ul className="space-y-3">
          <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Centre d'Aide</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Technique</a></li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h4 className="text-lg font-semibold mb-6 text-white">Contact</h4>
        <div className="space-y-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <a href="mailto:academy@dmplus-group.com" className="text-white hover:text-red-400 transition-colors">academy@dmplus-group.com</a>
            </div>
          </div>
          <div className="flex items-start">
            <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <div>
              <p className="text-gray-400 text-sm">Téléphone</p>
              <a href="tel:+221338295879" className="text-white hover:text-red-400 transition-colors">+221 33 829 58 79</a>
            </div>
          </div>
          <div className="flex items-start">
            <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.496.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 9.89-5.335 9.89-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <div>
              <p className="text-gray-400 text-sm">WhatsApp</p>
              <a href="https://wa.me/221766638219" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400 transition-colors">+221 76 663 82 19</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-gray-800 mt-12 pt-8">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div className="mb-4 lg:mb-0">
          <p className="text-gray-400 text-sm">© 2025 DIGITAL MIND PLUS ACADEMY. Tous droits réservés.</p>
          <p class="text-gray-500 text-xs mt-1">Ce site ne fait pas partie du site web Facebook ou de Facebook, Inc. ni de Google Inc.</p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Mentions Légales</a>
          <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Confidentialité</a>
          <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">CGU/CGV</a>
          <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Politique Cookies</a>
        </div>
      </div>
    </div>
  </div>
</footer>
```

## Résumé des Options:

### 🎯 **Option 1**: Moderne & Minimaliste
- Background sombre élégant
- Social media integration
- Structure 4 colonnes clean
- Idéal pour image professionnelle

### 💎 **Option 2**: Élégant avec Cartes
- Design moderne avec cartes
- Hover effects interactifs
- Badges et tags visuels
- Très structuré et aéré

### 🌟 **Option 3**: Premium Complet
- Newsletter section intégrée
- Multiple sections thématiques
- Background noir premium
- Très complet et professionnel

Chaque option peut être personnalisée selon vos préférences. Laquelle préférez-vous que j'implémente ?
