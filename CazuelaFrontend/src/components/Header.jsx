import React from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Package, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <motion.header
      className="bg-orange-600 text-yellow-100 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
    >
      <div className="container mx-auto flex justify-center items-center gap-16 p-4">
        <Link to="/" className="flex items-center gap-3">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <UtensilsCrossed className="w-8 h-8 text-yellow-300" />
          </motion.div>
          <h1 className="text-2xl font-bold tracking-tight text-yellow-300">La Cazuela Chapina</h1>
        </Link>

        <nav>
          <ul className="flex gap-10 text-lg font-semibold">
            <li>
              <Link to="/catalogo" className="hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2">
                <Package className="w-5 h-5" /> Catálogo
              </Link>
            </li>
            <li>
              <Link to="/combos" className="hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5" /> Combos
              </Link>
            </li>
            <li>
              <Link to="/pedido" className="hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2">
                Pedido
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5" /> Panel
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
