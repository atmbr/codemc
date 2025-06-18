import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CommandSimulator from '../CommandSimulator';

const SimulationArea = ({ result }) => (
  <AnimatePresence>
    {result && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <CommandSimulator result={result} />
      </motion.div>
    )}
  </AnimatePresence>
);

export default SimulationArea;
